const salesQueue = require('../queues/sales');

module.exports = {
  create(req, res) {
    const payload = { ...req.body, ...{ companyId: req.user.id } };

    return salesQueue
      .createJob(payload)
      .then(() => res.status(201).send())
      .catch(exception => res.status(500).send(exception));
  },
};
