const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');
const { check, validationResult } = require('express-validator');
const coba = require('../../controller/masterlist/M_Korespodensi');

router.get('/', controller.M_DetailBarangForm.getAll);
router.get('/:id_detailmasterlist_barang',
	[check('id_detailmasterlist_barang')
		.isNumeric()
		.trim()
		.escape()],
	controller.M_DetailBarangForm.getOne);
router.post('/', [check('serial_num_urut')
	.isNumeric()
	.trim()
	.escape(),
check('kd_hs')
	.isLength({ max: 45 })
	.blacklist('~!@#$%^&*()_+=<>{}?/":')
	.trim()
	.escape(),
check('spesifikasi')
	.isLength({ max: 200 })
	.blacklist('~!@#$%^&*()_+=<>{}?/":')
	.trim()
	.escape(),
check('jml_satuan')
	.isNumeric()
	.trim()
	.escape(),
check('kd_satuan')
	.isLength({ max: 5 })
	.blacklist('~!@#$%^&*()_+=<>{}?/":')
	.trim()
	.escape(),
check('jenis_fasilitas')
	.isLength({ max: 100 })
	.blacklist('~!@#$%^&*()_+=<>{}?/":')
	.trim()
	.escape(),
check('incoterm')
	.isNumeric()
	.trim()
	.escape(),
check('kd_valuta')
	.isLength({ max: 3 })
	.blacklist('~!@#$%^&*()_+=<>{}?/":')
	.trim()
	.escape(),
check('nilai')
	.trim()
	.escape(),
check('id_dokumen')
	.isNumeric()
	.trim()
	.escape(),
check('kd_detail_negara')
	.isNumeric()
	.trim()
	.escape(),
check('berlaku')
	.isLength({ max: 1 })
	.blacklist('~!@#$%^&*()_+=<>{}?/":')
	.trim()
	.escape(),
check('deskripsi_hs')
	.isLength({ max: 200 })
	.blacklist('~!@#$%^&*()_+=<>{}?/":')
	.trim()
	.escape(),
check('ur_barang')
	.isLength({ max: 200 })
	.blacklist('~!@#$%^&*()_+=<>{}?/":')
	.trim()
	.escape()],
	controller.M_DetailBarangForm.insert);
router.put('/:id_detailmasterlist_barang',
	[check('serial_num_urut')
		.isNumeric()
		.trim()
		.escape(),
	check('kd_hs')
		.isLength({ max: 45 })
		.blacklist('~!@#$%^&*()_+=<>{}?/":')
		.trim()
		.escape(),
	check('spesifikasi')
		.isLength({ max: 200 })
		.blacklist('~!@#$%^&*()_+=<>{}?/":')
		.trim()
		.escape(),
	check('jml_satuan')
		.isNumeric()
		.trim()
		.escape(),
	check('kd_satuan')
		.isLength({ max: 5 })
		.blacklist('~!@#$%^&*()_+=<>{}?/":')
		.trim()
		.escape(),
	check('jenis_fasilitas')
		.isLength({ max: 100 })
		.blacklist('~!@#$%^&*()_+=<>{}?/":')
		.trim()
		.escape(),
	check('incoterm')
		.isNumeric()
		.trim()
		.escape(),
	check('kd_valuta')
		.isLength({ max: 3 })
		.blacklist('~!@#$%^&*()_+=<>{}?/":')
		.trim()
		.escape(),
	check('nilai')
		.trim()
		.escape(),
	check('id_dokumen')
		.isNumeric()
		.trim()
		.escape(),
	check('kd_detail_negara')
		.isNumeric()
		.trim()
		.escape(),
	check('berlaku')
		.isLength({ max: 1 })
		.blacklist('~!@#$%^&*()_+=<>{}?/":')
		.trim()
		.escape(),
	check('deskripsi_hs')
		.isLength({ max: 200 })
		.blacklist('~!@#$%^&*()_+=<>{}?/":')
		.trim()
		.escape(),
	check('ur_barang')
		.isLength({ max: 200 })
		.blacklist('~!@#$%^&*()_+=<>{}?/":')
		.trim()
		.escape()],
	controller.M_DetailBarangForm.update);
router.delete('/:id_detailmasterlist_barang',
	[check('id_detailmasterlist_barang')
		.isNumeric()
		.trim()
		.escape()],
	controller.M_DetailBarangForm.delete);
module.exports = router;

