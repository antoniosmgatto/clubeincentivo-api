/* eslint-disable import/no-unresolved */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const basicAuth = require('express-basic-auth');
const passport = require('passport');
const LocalAPIKeyStrategy = require('passport-localapikey').Strategy;
const firebase = require('firebase');
const schedule = require('node-schedule');
const moment = require('moment');
const { Op } = require('sequelize');
const salesFirebase = require('./queues/sales-firebase');

const indexRouter = require('./routes/index');
const companiesRouter = require('./routes/companies');
const salesRouter = require('./routes/sales');
const customersRouter = require('./routes/customers');
const {
  Company,
  Customer,
  PdvToken,
  Sale,
  SaleItem,
  Transaction,
  sequelize,
} = require('./models');

const app = express();
const basicAuthMidleware = basicAuth({
  users: {
    admin: process.env.ADM_PASSWD,
  },
});

passport.use(
  new LocalAPIKeyStrategy((apikey, done) => {
    PdvToken.findOne({
      where: { token: apikey },
      include: [{ model: Company, as: 'company' }],
    }).then((pdvToken) => {
      if (!pdvToken) {
        return done(null, false);
      }
      return done(null, pdvToken.company);
    });
  }),
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// setup authentication
app.use((req, res, next) => {
  if (req.path.startsWith('/adm')) {
    basicAuthMidleware(req, res, next);
  } else if (req.path.startsWith('/pdv-client')) {
    passport.authenticate('localapikey', { session: false })(req, res, next);
  } else {
    next();
  }
});

app.use('/', indexRouter);
app.use('/customers', customersRouter);
// admin routes
app.use('/adm/companies', companiesRouter);
app.use('/pdv-client/sales', salesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// setup firebase
const config = {
  apiKey: process.env.CLUBE_INVENTIVO_FIREBASE_API_KEY,
  authDomain: process.env.CLUBE_INVENTIVO_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.CLUBE_INVENTIVO_FIREBASE_DATABASE_URL,
};
firebase.initializeApp(config);

passport.authenticate('basic', { session: false });

// cron task to clean up sales
schedule.scheduleJob('*/14 * * * *', () => {
  Sale.destroy({
    where: {
      customerId: null,
      onBalance: false,
      purchaseDate: { [Op.lte]: moment().day(-7) },
    },
  });
});

// cron task to lauch cashback to customers
schedule.scheduleJob('*/2 * * * *', async () => {
  const sales = await Sale.findAll({
    attributes: ['id'],
    where: {
      customerId: {
        [Op.not]: null,
      },
      onBalance: false,
      cashbackDate: { [Op.lte]: moment() },
    },
  });

  sales.forEach(async (saleFound) => {
    let dbTransaction;
    try {
      dbTransaction = await sequelize.transaction();
      const sale = await Sale.findByPk(saleFound.id, {
        include: [
          { model: SaleItem, as: 'items' },
          { model: Customer, as: 'customer' },
          { model: Company, as: 'company' },
        ],
        transaction: dbTransaction,
      });

      const saleUpdated = await sale.update(
        { onBalance: true },
        { transaction: dbTransaction },
      );

      const transactionSaved = await Transaction.create(
        {
          tag: 'CASHBACK',
          value: saleUpdated.cashback,
          customerId: sale.customer.id,
          companyId: sale.company.id,
          transactionable: 'Sale',
          transactionableId: saleUpdated.id,
        },
        { transaction: dbTransaction },
      );

      const transaction = await Transaction.findByPk(transactionSaved.id, {
        include: [
          { model: Customer, as: 'customer' },
          { model: Company, as: 'company' },
        ],
        transaction: dbTransaction,
      });
      const salePath = salesFirebase.salesPath(sale);
      const saleJson = salesFirebase.salePayload(saleUpdated);
      salesFirebase.saveOnFirebase(salePath, saleJson);

      // save the transaction on firebase
      const statementPath = salesFirebase.statementPath(transaction);
      const transactionJson = salesFirebase.statementPayload(transaction);
      salesFirebase.saveOnFirebase(statementPath, transactionJson);

      // save custom balance
      const companyPath = await salesFirebase.companyPath(
        sale.customer.guid,
        sale.company.guid,
      );
      const customerBalance = await salesFirebase.customerBalance(
        sale.customer.id,
        sale.company.id,
      );
      const companyJson = salesFirebase.companyPayload(
        sale.company,
        customerBalance,
      );
      salesFirebase.saveOnFirebase(companyPath, companyJson);
      dbTransaction.commit();
    } catch (err) {
      if (err) await dbTransaction.rollback();
    }
  });
});

module.exports = app;
