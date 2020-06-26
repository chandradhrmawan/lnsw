const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');
const {check, validationResult} = require('express-validator');

router.get('/', controller.ga.getAll);
router.get('/:search', controller.ga.get);
router.post('/', [
    check('kd_ga').isLength({min:1}),
    check('ur_ga').isLength({min:3}).blacklist('~!@#$%^&*()_+=<>{}?/":;[]')
], controller.ga.post);
router.put('/:kd_ga', [check('ur_ga').isLength({min:1})], controller.ga.update);

module.exports = router;