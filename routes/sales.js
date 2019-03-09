const express = require('express');

const router = express.Router();
const salesController = require('../controllers/sales');

router.post('/', salesController.create);

module.exports = router;
