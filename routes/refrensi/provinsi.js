const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');
const {check, validationResult} = require('express-validator');

router.get('/', controller.provinsi.getAll);
router.get('/:search', controller.provinsi.get);
router.post('/', [
    check('kd_provinsi').isLength({min:1}),
    check('ur_provinsi').isLength({min:3}).blacklist('~!@#$%^&*()_+=<>{}?/":;[]')
], controller.provinsi.post);
router.put('/:kd_provinsi', [check('ur_provinsi').isLength({min:1})], controller.provinsi.update);

module.exports = router;