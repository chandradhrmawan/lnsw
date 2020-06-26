const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');
const {check, validationResult} = require('express-validator');

router.get('/', controller.perijinan.getAll);
router.get('/:search', controller.perijinan.get);
router.post('/', [
    check('kd_perijinan').isLength({min:1}),
    check('ur_perijinan').isLength({min:3}).blacklist('~!@#$%^&*()_+=<>{}?/":;[]'),
    check('kd_ga').isLength({min:1})
], controller.perijinan.post);
router.put('/:kd_perijinan', [
    check('ur_perijinan').isLength({min:3}).blacklist('~!@#$%^&*()_+=<>{}?/":;[]'),
    check('kd_ga').isLength({min:1})
], controller.perijinan.update);

module.exports = router;