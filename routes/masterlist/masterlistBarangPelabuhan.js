const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');
const { check, validationResult } = require('express-validator');

router.get('/', controller.M_DetailBarangPelabuhan.getAll);
router.get('/:id_detailbrg_pelabuhan',
	[check('id_detailbrg_pelabuhan')
		.isNumeric()
		.trim()
		.escape()],
	controller.M_DetailBarangPelabuhan.getOne);
router.post('/', [check('id_detailmasterlist_barang')
	.isNumeric()
	.trim()
	.escape(),
check('kd_negara')
	.isLength({ max: 2 })
	.blacklist('~!@#$%^&*()_+=<>{}?/":')
	.trim()
	.escape()],
	controller.M_DetailBarangPelabuhan.insert);
router.put('/:id_detailbrg_pelabuhan',
	[check('id_detailbrg_pelabuhan')
		.isNumeric()
		.trim()
		.escape()],
	controller.M_DetailBarangPelabuhan.update);
router.delete('/:id_detailbrg_pelabuhan',
	[check('id_detailbrg_pelabuhan')
		.isNumeric()
		.trim()
		.escape()],
	controller.M_DetailBarangPelabuhan.delete);

module.exports = router;