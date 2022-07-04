const express = require('express');

const {Router} = express;
const router = new Router();

const orders = require('./session');

router.use('/', orders);

module.exports = router;
