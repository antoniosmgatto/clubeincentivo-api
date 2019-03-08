const Sequelize = require('sequelize');
const { Company } = require('../models');

module.exports = {
  index(req, res) {
    const limit = req.query.limit || 20;
    const offset = (req.query.page > 1 ? req.query.page - 1 : 0 || 0) * limit;

    return Company.findAll({
      order: [['id', 'ASC']],
      offset,
      limit,
    }).then(companys => res.json(companys));
  },
  create(req, res) {
    return Company.create(req.body)
      .then(company => res.status(201).json(company))
      .catch(exception => res.status(500).send(exception));
  },
  show(req, res) {
    const { id } = req.params;
    return Company.findById(id)
      .then((company) => {
        if (company == null) return res.status(404).end();
        return res.json(company);
      })
      .catch(exception => res.status(500).send(exception));
  },
  update(req, res) {
    const { id } = req.params;
    return Company.findById(id)
      .then((company) => {
        if (company == null) return res.status(404).end();
        return company.update(req.body);
      })
      .then((company) => {
        if (company instanceof Sequelize.ValidationError) return res.status(422).send(company);
        return res.json(company);
      })
      .catch(exception => res.status(500).send(exception));
  },
  delete(req, res) {
    const { id } = req.params;
    return Company.findById(id)
      .then((company) => {
        if (company == null) return res.status(404).end();
        return company.destroy();
      })
      .then(() => res.status(204).send())
      .catch(exception => res.status(500).send(exception));
  },
};
