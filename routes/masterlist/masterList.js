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
router.put('/updateDokumen/:id_dokumen', controller.masterList.updateDokumen);
router.post('/uploadDokumen',controller.masterList.uploadDokumen);
router.delete('/deleteDokumen/:id_dokumen', controller.masterList.deleteDokumen);


/*admin kek*/
router.get('/getStatus', controller.masterList.getStatus);
router.put('/updateStatus/:id_permohonan', controller.masterList.updateStatusPengajuan);
router.get('/viewPengajuan', controller.masterList.viewPengajuan);

module.exports = router;