const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');
const {check, validationResult} = require('express-validator');

router.get('/', controller.layanan.getAll);
router.get('/get', controller.layanan.get);

module.exports = router;