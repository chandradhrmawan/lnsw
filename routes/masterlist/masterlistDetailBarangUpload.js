const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');
const { check, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, './assets/upload/MasterlistBarang/');
	},
	filename: function(req, file, cb){
		cb(null, Date.now()+'_'+file.originalname);
	}
});


const fileFilter = (req, file, cb) => {
    if (path.extname(file.originalname) == '.xlsx') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});



router.get('/', controller.M_DetailBarangUpload.getAll);
router.get('/:id_permohonan/:id_barang',
	controller.M_DetailBarangUpload.getOne);
router.post('/',upload.single('file'), controller.M_DetailBarangUpload.insert);
router.put('/:id_detailmasterlist_barang',
	[check('id_detailmasterlist_barang').isNumeric().trim().escape()],
	controller.M_DetailBarangUpload.update);
router.delete('/:id_detailmasterlist_barang',
	[check('id_detailmasterlist_barang').isNumeric().trim().escape()],
	controller.M_DetailBarangUpload.delete);

module.exports = router;