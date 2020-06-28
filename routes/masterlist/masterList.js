const express 	 = require('express');
const router 	 = express.Router();
const controller = require('../../controller/index');


router.get('/getAll/', controller.masterList.getAll);
router.get('/hex/:keyword', controller.masterList.hex);
router.get('/', controller.masterList.get);
router.put('/:id_permohonan',  controller.masterList.update);
router.post('/post-data-form',  controller.masterList.post);
router.put('/updateData/:id_permohonan',  controller.masterList.updateMasterList);

router.get('/getAllDokumen', controller.masterList.getDokumen);
router.get('/getOneDokumen', controller.masterList.getOneDokumen);
router.post('/uploadDokumen',controller.masterList.uploadDokumen);
router.delete('/deleteDokumen/:id_dokumen', controller.masterList.deleteDokumen);

module.exports = router;