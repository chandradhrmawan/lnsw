const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');
const { check, validationResult } = require('express-validator');

router.get('/', controller.kek.getAll);
router.get('/:search', controller.kek.findKek);
// router.post('/', [
//     check('id_kota').isLength({ min: 1 }).blacklist('~!@#$%^&*()_+=<>{}?/":;[]'),
//     check('ibu_kota').isLength({ min: 3 }).blacklist('~!@#$%^&*()_+=<>{}?/":;[]'),
//     check('nama_kota_kabupaten').isLength({ min: 3 }).blacklist('~!@#$%^&*()_+=<>{}?/":;[]'),
//     check('kd_provinsi').isLength({ min: 3 }).blacklist('~!@#$%^&*()_+=<>{}?/":;[]')
// ], controller.kek.post);
// router.put('/:KD_KOTA', [
//     check('id_kota').isLength({ min: 1 }).blacklist('~!@#$%^&*()_+=<>{}?/":;[]'),
//     check('ibu_kota').isLength({ min: 3 }).blacklist('~!@#$%^&*()_+=<>{}?/":;[]'),
//     check('nama_kota_kabupaten').isLength({ min: 3 }).blacklist('~!@#$%^&*()_+=<>{}?/":;[]'),
//     check('kd_provinsi').isLength({ min: 3 }).blacklist('~!@#$%^&*()_+=<>{}?/":;[]')
// ], controller.kek.update);

module.exports = router;