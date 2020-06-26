const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');

router.post('/post-data', controller.login.postLogin);
module.exports = router;