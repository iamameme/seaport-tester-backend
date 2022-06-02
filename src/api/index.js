const express = require('express');

const {Router} = express;
const router = new Router();

const orders = require('./session');

router.use('/api/orders', orders);

module.exports = router;
