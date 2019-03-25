const express = require('express');

const router = express.Router();
const customersController = require("../controllers/customers");

router.post('/', customersController.create);

module.exports = router;
