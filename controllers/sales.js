const { Sale, SaleItem } = require('../models');

module.exports = {
  create(req, res) {
    const body = { ...req.body, ...{ companyId: req.user.id } };
    return Sale
      .create(body, {
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
};
