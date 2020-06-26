const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { check, validationResult } = require('express-validator');
const model = require('../../config/model/index');
const controller = require('../../controller/index');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/upload/MasterlistBarang/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'application/pdf') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,

})

router.post('/', upload.single('path'), function (req, res) {
    controller.dokumen.upload(req, res)
});
// router.post('/', upload.single('path'));
router.get('/getAll', controller.dokumen.getAll);
router.get('/getAll/:search', [check('search')
    .trim()
    .escape()], controller.dokumen.getNib);
module.exports = router;