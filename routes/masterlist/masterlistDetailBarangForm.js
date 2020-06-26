const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');
const { check, validationResult } = require('express-validator');
const coba = require('../../controller/masterlist/M_Korespodensi');

router.get('/getAll', controller.M_DetailBarangForm.getAll);
router.get('/getOne', controller.M_DetailBarangForm.getOne);
router.post('/', controller.M_DetailBarangForm.insert);
router.put('/:id_detailmasterlist_barang/:id_detailbrg_pelabuhan', controller.M_DetailBarangForm.update);
router.delete('/:id_detailmasterlist_barang', controller.M_DetailBarangForm.delete);
module.exports = router;

