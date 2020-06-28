const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');
const { check, validationResult } = require('express-validator');

router.get('/', controller.log.getAll);
router.get('/search', controller.log.getFind);

module.exports = router;