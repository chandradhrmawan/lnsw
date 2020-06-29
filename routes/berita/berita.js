const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');

router.get('/all', controller.berita.getAll);
router.get('/home', controller.berita.getHome);
router.get('/', controller.berita.getDetail);

module.exports = router;