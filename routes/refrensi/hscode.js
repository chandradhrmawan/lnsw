const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');
const {check, validationResult} = require('express-validator');

router.get('/', controller.hscode.getAll);
router.get('/:search', controller.hscode.get);
router.post('/', [
    check('kd_hs').isLength({min:1}),
    check('hd_code_format').isLength({min:1}),
    check('id_takik').isLength({min:1}),
    check('uraian_id').isLength({min:1}),
    check('uraian_en').isLength({min:1}),
    check('bm_mfn').isLength({min:1}),
    check('no_skep').isLength({min:1}),
    check('tanggal_skep').isLength({min:1}),
    check('berlaku').isLength({min:1}),
    check('fl_use').isLength({min:1})
], controller.hscode.post);
router.put('/:ID_HSCODE', [
    check('kd_hs').isLength({min:1}),
    check('hd_code_format').isLength({min:1}),
    check('id_takik').isLength({min:1}),
    check('uraian_id').isLength({min:1}),
    check('uraian_en').isLength({min:1}),
    check('bm_mfn').isLength({min:1}),
    check('no_skep').isLength({min:1}),
    check('tanggal_skep').isLength({min:1}),
    check('berlaku').isLength({min:1}),
    check('fl_use').isLength({min:1})
], controller.hscode.update);

module.exports = router;