const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');
const {check, validationResult} = require('express-validator');

router.get('/', controller.jenis_dokumen.getAll);
router.get('/:search', controller.jenis_dokumen.get);
router.post('/', [
    check('kd_dokumen').isLength({min:1}),
    check('ur_jenis_dokumen').isLength({min:3}).blacklist('~!@#$%^&*()_+=<>{}?/":;[]')
], controller.jenis_dokumen.post);
router.put('/:kd_dokumen', [check('ur_jenis_dokumen').isLength({min:1})], controller.jenis_dokumen.update);

module.exports = router;