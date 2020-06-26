const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');

/*router.get('/', controller.masterList.getAll);
router.get('/:search', controller.masterList.get);
router.get('/generate', controller.masterList.generateNumber);*/

router.post('/postDataForm', controller.pengajuanMasterlist.postDataForm);
router.get('/test', controller.pengajuanMasterlist.test);
router.get('/coba', controller.pengajuanMasterlist.getAllData);
router.get('/getMasterlistHeader', controller.pengajuanMasterlist.getMasterlistHeader);
module.exports = router;