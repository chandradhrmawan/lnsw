const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');
const {check, validationResult} = require('express-validator');

router.get('/', controller.kurs.getAll);
router.get('/:search', controller.kurs.get);
router.post('/', controller.kurs.post);

module.exports = router;