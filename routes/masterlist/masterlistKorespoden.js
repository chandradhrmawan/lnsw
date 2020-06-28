const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');
const { check, validationResult } = require('express-validator');
const coba = require('../../controller/masterlist/M_Korespodensi');

router.get('/', coba.getAll);
router.get('/:id_korespodensi',
	[check('id_korespodensi')
		.isNumeric()
		.trim()
		.escape()],
	controller.M_Korespodensi.getOne);
router.get('/search/nib', controller.M_Korespodensi.getFind);
router.post('/korespodensi', [check('id_permohonan').isLength({ max: 17 })
	.blacklist('~!@#$%^&*()_+=<>{}?/":')
	.trim()
	.escape(),
check('tipe_korespodensi')
	.isLength({ max: 100 })
	.blacklist('~!@#$%^&*()_+=<>{}?/":')
	.trim()
	.escape(),
check('nama_korespodensi')
	.isLength({ max: 100 })
	.blacklist('~!@#$%^&*()_+=<>{}?/":')
	.trim()
	.escape(),
check('jbt_korespodensi')
	.isLength({ max: 100 })
	.blacklist('~!@#$%^&*()_+=<>{}?/":')
	.trim()
	.escape(),
check('alamat_korespodensi')
	.isLength({ max: 100 })
	.blacklist('~!@#$%^&*()_+=<>{}?/":')
	.trim()
	.escape(),
check('jenis_korespodensi')
	.isLength({ max: 100 })
	.blacklist('~!@#$%^&*()_+=<>{}?/":')
	.trim()
	.escape(),
check('nomor_identitas')
	.isLength({ max: 100 })
	.blacklist('~!@#$%^&*()_+=<>{}?/":')
	.trim()
	.escape(),
check('no_telpon')
	.isLength({ max: 100 })
	.blacklist('~!@#$%^&*()_+=<>{}?/":')
	.trim()
	.escape(),
check('no_hp')
	.isLength({ max: 100 })
	.blacklist('~!@#$%^&*()_+=<>{}?/":')
	.trim()
	.escape(),
check('email')
	.isEmail().normalizeEmail()
	.trim()
	.escape()],
	controller.M_Korespodensi.insert);
router.put('/:id_korespodensi',
	[check('id_korespodensi').isNumeric().trim().escape()],
	controller.M_Korespodensi.update);
router.delete('/:id_korespodensi',
	[check('id_korespodensi').isNumeric().trim().escape()],
	controller.M_Korespodensi.delete);

module.exports = router;