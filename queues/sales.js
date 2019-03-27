const Queue = require('bee-queue');
const CPF = require('@fnando/cpf/dist/node');
const firebase = require("firebase");

const {
  Company, Customer, Sale, SaleItem,
} = require('../models');

const queue = new Queue('sales', {
  redis: {
    url: process.env.REDIS_URL,
  },
});

const createSale = json => Sale.create(json, {
  include: [
    {
      model: SaleItem,
      as: 'items',
    },
  ],
});

const findSale = id => Sale.findByPk(id, {
  include: [
    {
      model: SaleItem,
      as: 'items',
    },
    {
      model: Company,
      as: 'company',
    },
    {
      model: Customer,
      as: 'customer',
    },
  ],
});

const parseClientDocument = (json) => {
  let document = json.clientDocument;
  document = CPF.strip(document);
  return CPF.format(document);
};

// eslint-disable-next-line object-shorthand
const findCustomer = document => Customer.findOne({ where: { document } });

const sendToFirebase = (sale) => {
  firebase
    .database()
    .ref(
      `users/${sale.customer.uid}/companies/${sale.company.uid}/sales/${
        sale.cfeId
      }`,
    )
    .set({
      cfeId: sale.cfeId,
      items: sale.items.map(item => ({
        code: item.code,
        description: item.description,
        price: parseFloat(item.price),
        quantity: parseFloat(item.quantity),
      })),
      purchaseDate: sale.purchaseDate.getTime(),
      total: parseFloat(sale.total),
      cashback: parseFloat(sale.cashback),
      cashbackDate:
        sale.cashbackDate != null ? sale.cashbackDate.getTime() : null,
      onBalance: sale.onBalance,
    });
};

queue.process((job, done) => {
  const document = parseClientDocument(job.data);
  findCustomer(document).then((customer) => {
    const json = {
      ...job.data,
      ...{ clientDocument: document, customerId: customer && customer.id },
    };
    createSale(json).then((record) => {
      if (record.customerId != null) {
        findSale(record.id).then((sale) => {
          sendToFirebase(sale);
          done(null, true);
        });
      }
    });
  });
});

module.exports = {
  createJob: (json) => {
    const job = queue.createJob(json);
    return job.save();
  },
};
