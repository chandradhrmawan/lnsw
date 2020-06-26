const express = require('express');
const router = express.Router();
const {Op} = require('sequelize');
const controller = require('../../controller/autocomplete/negara');

router.get('/', controller.getAll);
router.get('/:search', controller.getOne);

module.exports = router;