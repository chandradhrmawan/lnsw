const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { check, validationResult } = require('express-validator');
const model = require('../../config/model/index');
const controller = require('../../controller/index');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './assets/upload/MasterlistBarang/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '_' + file.originalname);
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype == 'application/pdf') {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }

// const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter,

// })
//postDataMasterlist Barang
router.post('/', [check('JenisBarang')
    .isLength({ max: 45 })
    .blacklist('~!@#$%^&*()_+=<>{}?/":')
    .trim()
    .escape(),
check('KodePerijinan')
    .isLength({ max: 5 })
    .blacklist('~!@#$%^&*()_+=<>{}?/":')
    .trim()
    .escape(),
check('NomorIzin')
    .isLength({ max: 200 })
    .blacklist('~!@#$%^&*()_+=<>{}?/":')
    .trim()
    .escape(),
check('JenisHarga')
    .isLength({ max: 200 })
    .blacklist('~!@#$%^&*()_+=<>{}?/":')
    .trim()
    .escape(),
check('Incoterm')
    .isLength({ max: 5 })
    .blacklist('~!@#$%^&*()_+=<>{}?/":')
    .trim()
    .escape(),
check('KodeValuta')
    .isLength({ max: 3 })
    .blacklist('~!@#$%^&*()_+=<>{}?/":')
    .trim()
    .escape(),
check('Nilai')
    .trim()
    .escape(),
check('Berlaku')
    .isLength({ max: 1 })
    .blacklist('~!@#$%^&*()_+=<>{}?/":')
    .trim()
    .escape(),
check('Nib')
    .isLength({ max: 26 })
    .trim()
    .escape()], function (req, res) {
        controller.masterListBarang.postDataForm(req, res)
    });
//post Data masterlistbarang +Dokumen
router.post('/FormData',controller.masterListBarang.postData);
    /*[check('JenisBarang')
        .isLength({ max: 45 })
        .blacklist('~!@#$%^&*()_+=<>{}?/":')
        .trim()
        .escape(),
    check('KodePerijinan')
        .isLength({ max: 5 })
        .blacklist('~!@#$%^&*()_+=<>{}?/":')
        .trim()
        .escape(),
    check('NomorIzin')
        .isLength({ max: 200 })
        .blacklist('~!@#$%^&*()_+=<>{}?/":')
        .trim()
        .escape(),
    check('JenisHarga')
        .isLength({ max: 200 })
        .blacklist('~!@#$%^&*()_+=<>{}?/":')
        .trim()
        .escape(),
    check('Incoterm')
        .isLength({ max: 5 })
        .blacklist('~!@#$%^&*()_+=<>{}?/":')
        .trim()
        .escape(),
    check('KodeValuta')
        .isLength({ max: 3 })
        .blacklist('~!@#$%^&*()_+=<>{}?/":')
        .trim()
        .escape(),
    check('Nilai')
        .trim()
        .escape(),
    check('Berlaku')
        .isLength({ max: 1 })
        .blacklist('~!@#$%^&*()_+=<>{}?/":')
        .trim()
        .escape(),
    check('Nib')
        .isLength({ max: 26 })
        .trim()
        .escape()], *//*function (req, res) {
            controller.masterListBarang.postData(req, res)
        });*/
//postDokumen
router.post('/dokumen', function (req, res) {
    controller.masterListBarang.upload(req, res)
});
//postNewFromOld
router.post('/OldData', function (req, res) {
    controller.masterListBarang.postOld(req, res)
});
//getAll
router.get('/getAll', function (req, res) {
    controller.masterListBarang.getAll(req, res)
});
router.get('/getBy', function (req, res) {
    controller.masterListBarang.getFind(req, res)
});
router.get('/getAll/:Nib', function (req, res) {
    controller.masterListBarang.getNib(req, res)
});

router.delete('/:barangId', function (req, res) {
    controller.masterListBarang.deleteBarang(req, res)
});
// router.get('/generate', controller.masterListBarang.generateNumber);
// router.post('');
// router.post('/FormData', upload.single('path'), controller.masterListBarang.postDataForm);
module.exports = router;


// module.exports = router;