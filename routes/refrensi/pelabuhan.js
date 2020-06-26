const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');
const {check, validationResult} = require('express-validator');

router.get('/', controller.pelabuhan.getAll);
router.get('/:search', controller.pelabuhan.get);
router.post('/', [
    check('kd_pelabuhan').isLength({min:1}),
    check('ur_pelabuhan').isLength({min:3}).blacklist('~!@#$%^&*()_+=<>{}?/":;[]')
], controller.pelabuhan.post);
router.put('/:kd_pelabuhan', [check('ur_pelabuhan').isLength({min:1})], controller.pelabuhan.update);

module.exports = router;