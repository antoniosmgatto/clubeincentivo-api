/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const moment = require('moment');
const { Op } = require('sequelize');
const firebase = require('firebase');
const salesFirebase = require('../queues/sales-firebase');
const { Customer, Sale } = require('../models');

module.exports = {
  create(req, res) {
    return Customer.create(req.body)
      .then((customer) => {
        firebase
          .database()
          .ref(`users/${customer.guid}/info`)
          .set({
            fullName: customer.fullName,
            email: customer.email,
            document: customer.document,
            phoneNumber: customer.phoneNumber,
            birthday: moment(customer.birthday).format('YYYY-MM-DD'),
          });

        // migrating sales to customer
        Sale.findAll({
          where: {
            purchaseDate: {
              [Op.lt]: moment().hours(-1),
            },
            clientDocument: customer.document,
            customerId: null,
            onBalance: false,
          },
        }).then((sales) => {
          sales.forEach((sale) => {
            sale
              .update({ customerId: customer.id })
              .then(saleSave => salesFirebase.createJob({ saleId: saleSave.id }));
          });
        });
        res.status(201).json(customer);
      })
      .catch(exception => res.status(500).send(exception));
  },
};
