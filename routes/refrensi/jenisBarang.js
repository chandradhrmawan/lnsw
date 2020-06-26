const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');
const {check, validationResult} = require('express-validator');

console.log(controller.jenisBarang);
router.get('/', controller.jenisBarang.getAll);

module.exports = router;