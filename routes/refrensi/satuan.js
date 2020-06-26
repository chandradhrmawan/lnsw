const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');
const {check, validationResult} = require('express-validator');

router.get('/', controller.satuan.getAll);
router.get('/:search', controller.satuan.get);
router.post('/', [
    check('kd_satuan').isLength({min:1}),
    check('ur_satuan').isLength({min:3}).blacklist('~!@#$%^&*()_+=<>{}?/":;[]')
], controller.satuan.post);
router.put('/:kd_satuan', [check('ur_satuan').isLength({min:1})], controller.satuan.update);

module.exports = router;