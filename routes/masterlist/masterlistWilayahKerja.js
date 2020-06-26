const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');
const { check, validationResult } = require('express-validator');

router.get('/', controller.M_WilayahKerja.getAll);
router.get('/:id_wilayah_kerja',
	[check('id_wilayah_kerja')
		.isNumeric()
		.trim()
		.escape()],
	controller.M_WilayahKerja.getOne);
router.post('/', [check('kd_kota')
	.isNumeric()
	.trim()
	.escape(),
check('rt_rw')
	.isLength({ max: 20 })
	.blacklist('~!@#$%^&*()_+=<>{}?/":')
	.trim()
	.escape(),
check('alamat')
	.isLength({ max: 1000 })
	.blacklist('~!@#$%^&*()_+=<>{}?/":')
	.trim()
	.escape(),],
	controller.M_WilayahKerja.insert);
router.put('/:id_wilayah_kerja',
	[check('id_wilayah_kerja')
		.isNumeric()
		.trim()
		.escape()],
	controller.M_WilayahKerja.update);
router.delete('/:id_wilayah_kerja',
	[check('id_wilayah_kerja')
		.isNumeric()
		.trim()
		.escape()],
	controller.M_WilayahKerja.delete);

module.exports = router;