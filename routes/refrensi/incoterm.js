const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');
const {check, validationResult} = require('express-validator');

router.get('/', controller.incoterm.getAll);
router.get('/:search', controller.incoterm.get);
router.post('/', [
    check('incoterm').isLength({min:1}),
    check('ur_incoterm').isLength({min:3}).blacklist('~!@#$%^&*()_+=<>{}?/":;[]')
], controller.incoterm.post);
router.put('/:incoterm', [check('ur_incoterm').isLength({min:1})], controller.incoterm.update);

module.exports = router;