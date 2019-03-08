const express = require('express');

const router = express.Router();
const companiesController = require('../controllers/companies');

router.get('/', companiesController.index);
router.post('/', companiesController.create);
router.get('/:id', companiesController.show);
router.put('/:id', companiesController.update);
router.delete('/:id', companiesController.delete);

module.exports = router;
