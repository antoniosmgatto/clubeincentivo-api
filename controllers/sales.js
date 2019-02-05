const Sequelize = require('sequelize');
const Sale = require('../models').Sale;
const SaleItem = require('../models').SaleItem;

module.exports = {
  index(req, res) {
    var limit = (req.query.limit || 20)
    var offset = (req.query.page > 1 ? (req.query.page - 1) : 0 || 0) * limit

    return Sale
    .findAll({
      order: [
        [ 'id', 'ASC' ]
      ],
      include: [
        {
          model: SaleItem,
          as: 'items'
        }
      ],
      offset: offset,
      limit: limit
    })
    .then(sales => res.json(sales))
  },
  create(req, res) {
    return Sale
    .create(req.body, {
      include: [
        {
          model: SaleItem,
          as: 'items'
        }
      ]
    })
    .then(sale => res.json(sale))
    .catch(exception => res.status(500).send(exception));
  },
  show(req, res) {
    const id = req.params.id
    return Sale
    .findById(id, {
      include: [
        {
          model: SaleItem,
          as: 'items'
        }
      ]
    })
    .then(sale => {
      if (sale == null) return res.status(404).end();
      return res.json(sale)
    })
    .catch(exception => res.status(500).send(exception));
  },
  update(req, res) {
    const id = req.params.id;
    return Sale
    .findById(id, {
      include: [
        {
          model: SaleItem,
          as: 'items'
        }
      ]
    })
    .then(sale => {
      if (sale == null) return res.status(404).end();
      return sale.update(req.body);
    })
    .then(sale => {
      if (sale instanceof Sequelize.ValidationError) return console.log(sale);
      return res.json(sale);
    })
    .catch(exception => res.status(500).send(exception));
  },
  delete(req, res) {
    const id = req.params.id
    return Sale
    .findById(id)
    .then((sale) => {
      if (sale == null) return res.status(404).end();
      return sale.destroy();
    })
    .then(() => res.status(204).send())
    .catch(exception => res.status(500).send(exception));
  }
}
