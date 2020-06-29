const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');
const {check, validationResult} = require('express-validator');

router.get('/', controller.statusProses.getAll);
router.get('/get', controller.statusProses.get);

module.exports = router;