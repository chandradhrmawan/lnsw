const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');
const {check, validationResult} = require('express-validator');

router.get('/', controller.status_perijinan.getAll);
router.get('/:search', controller.status_perijinan.get);
router.post('/', [
    check('kd_status_perijinan').isLength({min:1}),
    check('ur_status_perijinan').isLength({min:3}).blacklist('~!@#$%^&*()_+=<>{}?/":;[]')
], controller.status_perijinan.post);
router.put('/:kd_status_perijinan', [check('ur_status_perijinan').isLength({min:1})], controller.status_perijinan.update);

module.exports = router;