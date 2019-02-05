var express = require('express');
var router = express.Router();
var salesController = require('../controllers/sales');

router.get('/', salesController.index);
router.post('/', salesController.create);
router.get('/:id', salesController.show);
router.put('/:id', salesController.update);
router.delete('/:id', salesController.delete);

module.exports = router;
