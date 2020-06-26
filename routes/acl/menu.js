const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');

router.get('/get-all-menu', controller.menu.getAllMenu);
module.exports = router;