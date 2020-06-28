const express 	 = require('express');
const router 	 = express.Router();
const controller = require('../../controller/index');


router.get('/getAll/', controller.masterList.getAll);
router.get('/hex/:keyword', controller.masterList.hex);
router.get('/', controller.masterList.get);
router.put('/:id_permohonan',  controller.masterList.update);
router.post('/post-data-form',  controller.masterList.post);
router.put('/updateData/:id_permohonan',  controller.masterList.updateMasterList);

router.get('/dokumen', controller.masterList.getDokumen);
router.post('/uploadDokumen',controller.masterList.uploadDokumen);


module.exports = router;