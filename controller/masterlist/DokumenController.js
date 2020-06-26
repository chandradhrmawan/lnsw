const model = require('../../config/model/index');
const { Op } = require('sequelize');
const controller = {};
const path = require('path');

controller.upload = async function (req, res) {
    // console.log(req);
    // const errInput = validationResult(req);
    const validasiFile = path.extname(req.file.filename);
    console.log(req.body);
    if (validasiFile == '.pdf') {
        await model.dokumen.create({
            kd_dokumen: req.body.KodeDokumen,
            nomor_dokumen: req.body.NoDokumen,
            tgl_dokumen: Date.now(),
            id_permohonan: req.body.PermohonanId,
            filename_dokumen: req.file.path,
            no_seri_dokumen: req.body.NoSeriPermohonan,
            // id_dokumen: req.body.DokumenId,
            nib: req.body.Nib,
        }).then((result) => {
            res.status(201).json({
                'status': 'OK',
                'messages': 'Masterlist Dokumen berhasil ditambahkan',
                'data': result,
            })
        }).catch((err) => {
            res.status(404).json({
                code: '02',
                message: err
            });
        });
    } else {
        if (!errInput.isEmpty()) {
            res.status(404).json({
                code: '02',
                message: errInput.array()
            })
        } else {
            res.status(404).json({
                code: '02',
                message: 'File yang anda upload bukan berupa PDF'
            });
        }
    }
}
controller.getAll = async function (req, res) {
    await model.dokumen.findAll({
        attributes: [
            ['kd_dokumen', 'KodeDokumen'],
            ['nomor_dokumen', 'NoDokumen'],
            ['tgl_dokumen', 'TanggalDokumen'],
            ['filename_dokumen', 'Path'],
            ['id_permohonan', 'PermohonanId'],
            ['no_seri_dokumen', 'NoSeriDokumen'],
            ['nib', 'NIB']],
    })
        .then((result) => {
            if (result.length > 0) {
                res.status(200).json({
                    code: '01',
                    message: 'Sukses',
                    data: result
                });
            } else {
                res.status(200).json({
                    code: '01',
                    message: 'Tidak Ada Data'
                })
            }
        }).catch((err) => {
            res.status(400).json({
                code: '02',
                message: err
            });
        });
}
controller.getNib = async function (req, res) {
    const search = req.params.search;
    await model.dokumen.findAll({
        attributes: [
            ['kd_dokumen', 'KodeDokumen'],
            ['nomor_dokumen', 'NoDokumen'],
            ['tgl_dokumen', 'TanggalDokumen'],
            ['filename_dokumen', 'Path'],
            ['id_permohonan', 'PermohonanId'],
            ['no_seri_dokumen', 'NoSeriDokumen'],
            ['nib', 'NIB']],
        where: {
            nib: search,
        }
    })
        .then((result) => {
            if (result.length > 0) {
                res.status(200).json({
                    code: '01',
                    message: 'Sukses',
                    data: result
                });
            } else {
                res.status(200).json({
                    code: '01',
                    message: 'Tidak Ada Data'
                })
            }
        }).catch((err) => {
            res.status(400).json({
                code: '02',
                message: err
            });
        });
}

module.exports = controller;