const express = require('express');
const router = express.Router();
const controller = require('../../controller/index');
const { check, validationResult } = require('express-validator');
const coba = require('../../controller/masterlist/M_Korespodensi');

router.get('/', controller.M_DetailBarangForm.getAll);
router.get('/:id_permohonan/:id_barang', controller.M_DetailBarangForm.getOne);
router.get('/update', controller.M_DetailBarangForm.getOneUpdate);
router.post('/', controller.M_DetailBarangForm.insert);
router.put('/:id_detailmasterlist_barang', controller.M_DetailBarangForm.update);
router.delete('/:id_detailmasterlist_barang', controller.M_DetailBarangForm.delete);
module.exports = router;

