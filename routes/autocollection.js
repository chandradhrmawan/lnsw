const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const controller = require('../controller/index');

// router.get('/jeniSatuan', controller.jeniSatuan.getAll);
// router.get('/jeniSatuan/:search', controller.jeniSatuan.getOne);
// router.get('/kota', controller.kota.getAll);
// router.get('/kota/:search', controller.kota.getOne);
// router.get('/modaSarana', controller.modaSarana.getAll);
// router.get('/modaSarana/:search',controller.modaSarana.getOne);
// router.get('/negara', controller.negara.getAll);
// router.get('/negara/:search', controller.negara.getOne);
// router.get('/pelabuhan', controller.pelabuhan.getAll);
// router.get('/pelabuhan/:search',controller.pelabuhan.getOne);
// router.get('/provinsi', controller.provinsi.getAll);
// router.get('/provinsi/:search', controller.provinsi.getOne);

// router.get('/jenis-dok-ref', async function (req, res, next) {
//     await db.jenisDok.findAll({
//         attributes: [['kodejenisdokrerensi', 'KodeJenisDok'], ['namajenisdokreferensi', 'Nama'], ['flagberlaku', 'flag']],
//     })
//         .then((result) => {
//             if (result.length > 0) {
//                 res.status(200).json({
//                     code: '01',
//                     message: 'Sukses',
//                     data: result
//                 });
//             } else {
//                 res.status(404).json({
//                     code: '01',
//                     message: 'Tidak Ada Data'
//                 })
//             }
//         }).catch((err) => {
//             res.status(400).json({
//                 code: '02',
//                 message: err
//             });
//         })
// });

// router.get('/jenis-dok-ref/:search', async function (req, res, next) {
//     const search = req.params.search;
//     await db.jenisDok.findAll({
//         attributes: [['kodejenisdokrerensi', 'KodeJenisDok'], ['namajenisdokreferensi', 'Nama'], ['flagberlaku', 'flag']],
//         where: {
//             [Op.or]: [{
//                 kodejenisdokrerensi: {
//                     [Op.iLike]: '%' + search + '%'
//                 }
//             }, {
//                 namajenisdokreferensi: {
//                     [Op.iLike]: '%' + search + '%'
//                 }
//             }]
//         }
//     }).then((result) => {
//         if (result.length > 0) {
//             res.status(200).json({
//                 code: '01',
//                 message: 'Sukses',
//                 data: result
//             });
//         } else {
//             res.status(404).json({
//                 code: '01',
//                 message: 'Tidak Ada Data'
//             });
//         }
//     }).catch((err) => {
//         // console.log(err);
//         res.status(400).json({
//             code: '02',
//             message: err
//         })
//     });
// });

module.exports = router;