const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');
const { check, validationResult } = require('express-validator');

router.get('/', controller.M_LokProyek.getAll);
router.get('/:id_lok_proyek',
	[check('id_lok_proyek').isNumeric().trim().escape()],
	controller.M_LokProyek.getOne);
router.post('/', [check('nib')
	.isLength({ max: 26 })
	.trim()
	.escape(),
check('rt_rw_proyek')
	.isLength({ max: 100 })
	.blacklist('~!@#$%^&*()_+=<>{}?/":')
	.trim()
	.escape(),
check('kelurahan')
	.isLength({ max: 100 })
	.blacklist('~!@#$%^&*()_+=<>{}?/":')
	.trim()
	.escape(),
check('kd_kota')
	.isNumeric()
	.trim()
	.escape(),
check('kd_pos')
	.isLength({ max: 5 })
	.blacklist('~!@#$%^&*()_+=<>{}?/":')
	.trim()
	.escape()
],
	controller.M_LokProyek.insert);
router.put('/:id_lok_proyek',
	[check('id_lok_proyek')
		.isNumeric()
		.trim()
		.escape()],
	controller.M_LokProyek.update);
router.delete('/:id_lok_proyek',
	[check('id_lok_proyek')
		.isNumeric()
		.trim()
		.escape()],
	controller.M_LokProyek.delete);

module.exports = router;