const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');
const {check, validationResult} = require('express-validator');

router.get('/', controller.negara.getAll);
router.get('/:search', controller.negara.get);
router.post('/', [
    check('kd_negara').isLength({min:1}),
    check('ur_negara').isLength({min:3}).blacklist('~!@#$%^&*()_+=<>{}?/":;[]')
], controller.negara.post);
router.put('/:kd_negara', [check('ur_negara').isLength({min:1})], controller.negara.update);

module.exports = router;