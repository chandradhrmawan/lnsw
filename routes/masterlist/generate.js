const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');
router.get('/', controller.generate.getAll);
router.get('/:word', controller.generate.Code);
module.exports = router;