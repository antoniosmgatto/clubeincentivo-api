const express = require('express');

const router = express.Router();
const companiesController = require('../controllers/companies');
const pdvTokensController = require('../controllers/pdv_tokens');

router.get('/', companiesController.index);
router.post('/', companiesController.create);
router.get('/:id', companiesController.show);
router.put('/:id', companiesController.update);
router.delete('/:id', companiesController.delete);
router.get('/:companyId/pdv-tokens', pdvTokensController.index);
router.post('/:companyId/pdv-tokens', pdvTokensController.create);
router.delete('/:companyId/pdv-tokens/:id', pdvTokensController.delete);

module.exports = router;
