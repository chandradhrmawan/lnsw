const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');
const { check, validationResult } = require('express-validator');
const path = require('path');

router.post('/', controller.M_DetailBarangUpload.insert);

module.exports = router;