const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const {check, validationResult} = require('express-validator');
const model = require('../../config/model/index');
const controller = require('../../controller/index');

const storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, './assets/upload/');
	},
	filename: function(req, file, cb){
		cb(null, file.originalname);
	}
});

const fileFilter = (req, file, cb)=>{
	if(file.mimetype == 'application/pdf'){
		cb(null, true);
	}else{
		cb(null, false);
	}
}

const upload = multer({
	storage: storage,
	fileFilter: fileFilter
})


router.get('/', controller.documentLayanan.getAll);
router.get('/:id_dokumen', controller.documentLayanan.getOne);
router.post('/', upload.single('file'),
				 [check('id_seri').isNumeric().trim().escape(),
				  check('kd_dokumen')
				  	.isLength({max: 3})
				  	.trim()
					.blacklist('~!@#$%^&*()_+=<>{}?/":')
				  	.escape(),
				  check('nomor_dokumen')
				  	.isLength({max: 50})
					.blacklist('~!@#$%^&*()_+=<>{}?/":'),
				  check('id_user')
				  	.isNumeric()
				  	.trim()
				  	.escape()], controller.documentLayanan.insert);
router.put('/:id_dokumen', 
				upload.single('file'),
				[check('id_seri').isNumeric().trim().escape(),
				  check('kd_dokumen')
				  	.isLength({max: 3})
				  	.trim()
					.blacklist('~!@#$%^&*()_+=<>{}?/":')
				  	.escape(),
				  check('nomor_dokumen')
				  	.isLength({max: 50})
					.blacklist('~!@#$%^&*()_+=<>{}?/":'),
				  check('id_user')
				  	.isNumeric()
				  	.trim()
				  	.escape()], controller.documentLayanan.update);
router.delete('/:id_dokumen', controller.documentLayanan.delete);
module.exports = router;