const Sequelize = require('sequelize');
const { Sale, SaleItem } = require('../models');

module.exports = {
  index(req, res) {
    const limit = (req.query.limit || 20);
    const offset = (req.query.page > 1 ? (req.query.page - 1) : 0 || 0) * limit;

    return Sale
      .findAll({
        order: [
          ['id', 'ASC'],
        ],
        include: [
          {
            model: SaleItem,
            as: 'items',
          },
        ],
        offset,
        limit,
      })
      .then(sales => res.json(sales));
  },
  create(req, res) {
    return Sale
      .create(req.body, {
        include: [
          {
            model: SaleItem,
            as: 'items',
          },
        ],
      })
      .then(sale => res.status(201).json(sale))
      .catch(exception => res.status(500).send(exception));
  },
  show(req, res) {
    const { id } = req.params;
    return Sale
      .findById(id, {
        include: [
          {
            model: SaleItem,
            as: 'items',
          },
        ],
      })
      .then((sale) => {
        if (sale == null) return res.status(404).end();
        return res.json(sale);
      })
      .catch(exception => res.status(500).send(exception));
  },
  update(req, res) {
    const { id } = req.params;
    return Sale
      .findById(id, {
        include: [
          {
            model: SaleItem,
            as: 'items',
          },
        ],
      })
      .then((sale) => {
        if (sale == null) return res.status(404).end();
        return sale.update(req.body);
      })
      .then((sale) => {
        if (sale instanceof Sequelize.ValidationError) return res.status(422).send(sale);
        return res.json(sale);
      })
      .catch(exception => res.status(500).send(exception));
  },
  delete(req, res) {
    const { id } = req.params;
    return Sale
      .findById(id)
      .then((sale) => {
        if (sale == null) return res.status(404).end();
        return sale.destroy();
      })
      .then(() => res.status(204).send())
      .catch(exception => res.status(500).send(exception));
  },
};
