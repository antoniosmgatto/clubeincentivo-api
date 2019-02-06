const express = require('express');

const router = express.Router();
const salesController = require('../controllers/sales');

router.get('/', salesController.index);
router.post('/', salesController.create);
router.get('/:id', salesController.show);
router.put('/:id', salesController.update);
router.delete('/:id', salesController.delete);

module.exports = router;
