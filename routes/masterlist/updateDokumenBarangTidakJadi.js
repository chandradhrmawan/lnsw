const express = require('express');
const router = express.Router();
const multer = require('multer');
const controller = require('../../controller/index');

const storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, './assets/upload/tamplateExcel/');
	},
	filename: function(req, file, cb){
		cb(null, Date.now()+'_'+file.originalname);
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
    fileFilter: fileFilter
});


router.post('/',upload.single('file'), controller.updateDetailDokumen.update);

module.exports = router;

