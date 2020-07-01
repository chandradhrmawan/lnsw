const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');
router.get('/filter-masterlist', controller.pg.getAll);
router.get('/testView', controller.pg.getView);
module.exports = router;