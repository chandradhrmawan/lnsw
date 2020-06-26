const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');
const {check, validationResult} = require('express-validator');

router.get('/', controller.jenis_permohonan.getAll);
router.get('/:search', controller.jenis_permohonan.get);
router.post('/', [
    check('kd_jenis_permoohonan').isNumeric().trim().escape(),
    check('ur_permohonan').isLength({min:3}).blacklist('~!@#$%^&*()_+=<>{}?/":;[]')
], controller.jenis_permohonan.post);
router.put('/:kd_jenis_permohonan', [check('ur_permohonan').isLength({min:1})], controller.jenis_permohonan.update);

module.exports = router;