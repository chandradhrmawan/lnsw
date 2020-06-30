const model = require('../../config/model/index');
const { Op } = require('sequelize');
const moment = require('moment');
const controller = {};
const helpers = require('../../helpers/global_helper');
const path = require('path');
const db = require('../../config/database/database');
const BarangModel = require('../../config/model/masterlist/MasterlistBarang');
const randomstring = require('randomstring');

controller.upload = async function (req, res) {
    // console.log(req);
    // const errInput = validationResult(req);
    const validasiFile = path.extname(req.file.filename);
    console.log(req.body);
    if (validasiFile == '.pdf') {
        await model.dokumen.create({
            id_dokumen: req.body.KodeDokumen,
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

controller.postData = async function (req, res) {
    let transaction;
    let now = moment();
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).json({ code: '02', message: 'No File Selected' });
    }

    let upload_param = {
        id_permohonan: req.body.PermohonanId,
        file_upload: req.files.path
    }

    let data_upload = await helpers.uploadData(upload_param);
    try {
        transaction = await db.transaction();
        const newDocument = await model.dokumen.create({
            id_dokumen: req.body.KodeDokumen,
            nomor_dokumen: req.body.NoDokumen,
            tgl_dokumen: Date.now(),
            id_permohonan: req.body.PermohonanId,
            filename_dokumen: data_upload.path,
            no_seri_dokumen: req.body.NoSeriPermohonan,
            nib: req.body.Nib
        }, { transaction: transaction })
        const MasterlistBarang = {
            id_barang: BarangInvoice(),
            id_permohonan: req.body.PermohonanId,
            // id_pemohonan_parent: req.body. ,
            jenis_barang: req.body.JenisBarang,
            kd_perijinan: req.body.KodePerijinan,
            nomor_izin: req.body.NomorIzin,
            tgl_izin: req.body.Tanggal,
            id_dokumen: newDocument.id_dokumen,
            doc_name: newDocument.filename_dokumen,
            jenis_harga: req.body.JenisHarga,
            incoterm: req.body.Incoterm,
            kd_valuta: req.body.KodeValuta,
            nilai: req.body.Nilai,
            berlaku: req.body.Berlaku,
            nib: req.body.Nib,
            uraian: req.body.Uraian,
            create_at: now,
            update_at: now
        };
        await model.masterListBarang.create(MasterlistBarang, { transaction: transaction })
        await transaction.commit();
        res.status(201).json({
            'status': 'OK',
            'messages': 'Masterlist Barang berhasil ditambahkan',
            'data': MasterlistBarang,
        })
    } catch (error) {
        if (transaction) {
            await transaction.rollback()
            res.status(400).json({
                'status': 'ERROR',
                'messages': error.message,
                'data': {},
            })
        }
    }
}

controller.deleteBarang = async function (req, res) {
    let transaction;
    const BarangId = req.params.barangId;
    try {
        const detail = await model.M_DetailBarang.findAll({
            where: {
                id_barang: BarangId
            }
        });
        transaction = await db.transaction();
        detail.forEach(hasil => {
            const pelabuhan = model.M_DetailBarangPelabuhan.destroy({
                where: {
                    id_detailmasterlist_barang: hasil.id_detailmasterlist_barang
                }
            }, { transaction: transaction });
        });
        detail.forEach(el => {
            const detailBarang = model.M_DetailBarang.destroy({
                where: {
                    id_detailmasterlist_barang: el.id_detailmasterlist_barang
                }
            }, { transaction: transaction });
        });
        let data_doc = await model.masterListBarang.findOne({
            where: { id_barang: BarangId }
        });
        let id_dokumen = data_doc.dataValues.id_dokumen;
        let path = data_doc.dataValues.doc_name;
        await helpers.deleteFile(path);

        await model.dokumen.destroy({
            where: {
                id_dokumen: id_dokumen
            }
        }, { transaction: transaction })
        await model.masterListBarang.destroy({
            where: {
                id_barang: BarangId
            }
        }, { transaction: transaction });
        res.status(200).json({
            'status': 'OK',
            'messages': 'Masterlist Barang berhasil di Hapus'
        })

    } catch (err) {
        if (transaction) {
            await transaction.rollback()
            res.status(400).json({
                'status': 'ERROR',
                'messages': err.message
            })
        }

    }
}

controller.postDataForm = async function (req, res) {
    try {
        console.log(req.body, BarangInvoice());
        const data = await BarangModel.create({
            id_barang: BarangInvoice(),
            id_pemohonan: req.body.PermohonanId,
            id_pemohonan_parent: req.body.PermohonanParent,
            jenis_barang: req.body.JenisBarang,
            kd_perijinan: req.body.KodePerijinan,
            nomor_izin: req.body.NomorIzin,
            tgl_izin: req.body.Tanggal,
            jenis_harga: req.body.JenisHarga,
            incoterm: req.body.Incoterm,
            kd_valuta: req.body.KodeValuta,
            nilai: req.body.Nilai,
            berlaku: req.body.Berlaku,
            nib: req.body.Nib


        });
        if (data) {
            res.status(201).json({
                'status': 'OK',
                'messages': 'Masterlist Barang berhasil ditambahkan',
                'data': data,
            })
        }
    } catch (err) {
        res.status(400).json({
            'status': 'ERROR',
            'messages': err.message,
            'data': {},
        })
    }
}
controller.getAll = async function (req, res) {
    await model.masterListBarang.findAll({
        attributes: [
            ['id_barang', 'BarangId'],
            ['jenis_barang', 'JenisBarang'],
            ['id_permohonan', 'PermohonanId'],
            ['kd_perijinan', 'KodePerijinan'],
            ['tgl_izin', 'TanggalIzin'],
            ['doc_name', 'Path'],
            ['jenis_harga', 'JenisHarga'],
            ['incoterm', 'KodeIncoterm'],
            ['kd_valuta', 'KodeValuta'],
            ['nilai', 'Total'],
            ['nib', 'NIB'],
            ['uraian', 'Uraian']],
        order: [
            ['create_at', 'DESC']
        ],
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
                    message: 'Tidak Ada Data',
                    data: {},
                })
            }
        }).catch((err) => {
            res.status(400).json({
                code: '02',
                message: err
            });
        });
}
controller.getFind = async function (req, res) {
    const Nib = req.query.nib;
    const PermohonanId = req.query.permohonan;
    await model.masterListBarang.findAll({
        attributes: [
            ['id_barang', 'BarangId'],
            ['jenis_barang', 'JenisBarang'],
            ['id_permohonan', 'PermohonanId'],
            ['id_barang_parent', 'ParentBarang'],
            ['kd_perijinan', 'KodePerijinan'],
            ['tgl_izin', 'TanggalIzin'],
            ['doc_name', 'Path'],
            ['jenis_harga', 'JenisHarga'],
            ['incoterm', 'KodeIncoterm'],
            ['kd_valuta', 'KodeValuta'],
            ['nilai', 'Total'],
            ['nib', 'NIB'],
            ['uraian', 'Uraian']],
        where: {
            [Op.and]: [{
                nib: Nib
            }, {
                id_permohonan: PermohonanId
            }
            ]
        },
        order: [
            ['create_at', 'DESC']
        ],
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
                    message: 'Tidak Ada Data',
                    data: {}
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
    const Nib = req.params.Nib;
    await model.masterListBarang.findAll({
        attributes: [
            ['id_barang', 'BarangId'],
            ['jenis_barang', 'JenisBarang'],
            ['id_permohonan', 'PermohonanId'],
            ['id_permohonan_parent', 'ParentPermohonan'],
            ['kd_perijinan', 'KodePerijinan'],
            ['tgl_izin', 'TanggalIzin'],
            ['doc_name', 'Path'],
            ['jenis_harga', 'JenisHarga'],
            ['incoterm', 'KodeIncoterm'],
            ['kd_valuta', 'KodeValuta'],
            ['nilai', 'Total'],
            ['nib', 'NIB'],
            ['uraian', 'Uraian']],
        where: {
            nib: Nib,
        },
        order: [
            ['create_at', 'DESC']
        ],

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

function BarangInvoice() {
    let rndm = randomstring.generate({
        length: 4,
        charset: 'alphabetic'
    });
    let now = moment(Date.now()).format('YYYYMMDDhhmm');
    let invoice = rndm + now;
    return invoice;

}


module.exports = controller;