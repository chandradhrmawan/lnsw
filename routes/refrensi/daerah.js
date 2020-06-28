const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');

router.get('/', controller.daerah.getAll);
router.get('/:search', controller.daerah.findDaerah);
router.get('/search/nib', controller.daerah.findbyNib);
router.get('/searchby/nib', controller.daerah.findProvinsi);
router.get('/searchby/prov', controller.daerah.findKota);
router.get('/searchby/kota', controller.daerah.findKecamatan);
router.get('/searchby/kec', controller.daerah.findKelurahan);
router.post('/', controller.daerah.post);
router.put('/:IdDaerah', controller.daerah.update);

module.exports = router;