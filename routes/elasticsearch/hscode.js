const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');

router.get('/', controller.es_hscode.get);

module.exports = router;