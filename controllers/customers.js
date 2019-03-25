const { Customer } = require('../models');
const moment = require("moment");
const firebase = require('firebase');

module.exports = {
  create(req, res) {
    return Customer.create(req.body)
      .then((customer) => {
        firebase
          .database()
          .ref(`users/${customer.uid}/info`)
          .set({
            fullName: customer.fullName,
            email: customer.email,
            document: customer.document,
            phoneNumber: customer.phoneNumber,
            birthday: moment(customer.birthday).format('YYYY-MM-DD'),
          });
        res.status(201).json(customer);
      })
      .catch(exception => res.status(500).send(exception));
  },
};
