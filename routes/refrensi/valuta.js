const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');
const {check, validationResult} = require('express-validator');

router.get('/', controller.valuta.getAll);
router.get('/:search', controller.valuta.get);
router.post('/', [
    check('kd_valuta').isLength({min:1}),
    check('ur_valuta').isLength({min:3}).blacklist('~!@#$%^&*()_+=<>{}?/":;[]')
], controller.valuta.post);
router.put('/:kd_valuta', [check('ur_valuta').isLength({min:1})], controller.valuta.update);

module.exports = router;