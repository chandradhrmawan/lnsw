const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');
const { check, validationResult } = require('express-validator');

router.get('/', controller.M_Pelb.getAll);
router.get('/:id_pelb_masterlist',
	[check('id_pelb_masterlist')
		.isNumeric()
		.trim()
		.escape()],
	controller.M_Pelb.getOne);
router.post('/', [check('kd_pelabuhan')
	.isLength({ max: 5 })
	.blacklist('~!@#$%^&*()_+=<>{}?/":')
	.trim()
	.escape(),
check('type_pelabuhan')
	.isLength({ max: 200 })
	.blacklist('~!@#$%^&*()_+=<>{}?/":')
	.trim()
	.escape(),
check('id_permohonan')
	.isLength({ max: 17 })
	.blacklist('~!@#$%^&*()_+=<>{}?/":')
	.trim()
	.escape()],
	controller.M_Pelb.insert);
router.put('/:id_pelb_masterlist',
	[check('id_pelb_masterlist')
		.isNumeric()
		.trim()
		.escape()],
	controller.M_Pelb.update);
router.delete('/:id_pelb_masterlist',
	[check('id_pelb_masterlist')
		.isNumeric()
		.trim()
		.escape()],
	controller.M_Pelb.delete);

module.exports = router;