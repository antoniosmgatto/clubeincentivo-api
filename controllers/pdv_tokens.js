const { PdvToken } = require('../models');

module.exports = {
  index(req, res) {
    return PdvToken.findAll({
      where: {
        companyId: req.params.companyId,
      },
      order: [['name', 'ASC']],
    }).then(pdvTokens => res.json(pdvTokens));
  },
  create(req, res) {
    const body = { ...req.body, ...{ companyId: req.params.companyId } };
    return PdvToken.create(body)
      .then(pdvToken => res.status(201).json(pdvToken))
      .catch(exception => res.status(500).send(exception));
  },
  delete(req, res) {
    const { id } = req.params;
    return PdvToken.findByPk(id)
      .then((pdvToken) => {
        if (pdvToken == null) return res.status(404).end();
        return pdvToken.destroy();
      })
      .then(() => res.status(204).send())
      .catch(exception => res.status(500).send(exception));
  },
};
