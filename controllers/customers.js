const { Customer } = require('../models');
const firebase = require('firebase');

module.exports = {
  create(req, res) {
    return Customer.create(req.body)
      .then((customer) => {

        res.status(201).json(customer);
      })
      .catch(exception => res.status(500).send(exception));
  },
};
