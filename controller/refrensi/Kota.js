const model = require('../../config/model/index');
const { Op } = require('sequelize');
const controller = {};
const path = require('path');
const moment = require('moment');
const {validationResult} = require('express-validator');

controller.getAll = async function (req, res) {
    await model.kota.findAll({
        attributes: [
            ['id_kota', 'idKota'],
            ['ibu_kota', 'ibuKota'],
            ['nama_kota_kabupaten', 'namaKabupaten'],
            ['kd_provinsi', 'kodeProvinsi']
        ]
    })
        .then((result) => {
            if (result.length > 0) {
                res.status(200).json({
                    code: '01',
                    message: 'Sukses',
                    data: result
                });
            } else {
                res.status(404).json({
                    code: '01',
                    message: 'Tidak Ada Data'
                });
            }
        }).catch((err) => {
            res.status(400).json({
                code: '02',
                message: err
            });
        })
};

controller.get = async function (req, res, next) {
    const search = req.params.search;
    await model.kota.findAll({
        attributes: [
            ['id_kota', 'idKota'],
            ['ibu_kota', 'ibuKota'],
            ['nama_kota_kabupaten', 'namaKabupaten'],
            ['kd_provinsi', 'kodeProvinsi']
        ],
        where: {
            [Op.or]: [{
                id_kota: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                ibu_kota: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                nama_kota_kabupaten: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                kd_provinsi: {
                    [Op.iLike]: '%' + search + '%'
                }
            }]
        }
    }).then((result) => {
        if (result.length > 0) {
            res.status(200).json({
                code: '01',
                message: 'Sukses',
                data: result
            });
        } else {
            res.status(404).json({
                code: '01',
                message: 'Tidak Ada Data'
            });
        }
    }).catch((err) => {
        res.status(400).json({
            code: '02',
            message: err
        })
    });
};

controller.post = async function (req, res) {
    const errInput = validationResult(req);
    if(errInput.isEmpty()){
        await model.kota.create({
            id_kota: req.body.id_kota,
            ibu_kota: req.body.ibu_kota,
            nama_kota_kabupaten: req.body.nama_kota_kabupaten,
            kd_provinsi: req.body.kd_provinsi
        }).then((result) => {
            res.status(201).json({
                code: '01',
                message: 'Kota berhasil ditambahkan',
                data: result
            })
        }).catch ((err) => {
            res.status(404).json({
                code: '02',
                message: err
            })
        });
    }else{
        res.status(404).json({
            code: '02',
            message: errInput
        });
    }
};

controller.update = async function (req, res) {
    const errInput = validationResult(req);
	if(errInput.isEmpty()){
		await model.kota.update({
			id_kota: req.body.id_kota,
			ibu_kota: req.body.ibu_kota,
			nama_kota_kabupaten: req.body.nama_kota_kabupaten,
			kd_provinsi: req.body.kd_provinsi
		},{
			where: {
				kd_kota: req.params.kd_kota
			}
		}).then(result => {
			res.status(200).json({
				code: '01',
				message: 'Kota berhasil Diubah',
			})
		}).catch(err => {
			res.status(404).json({
				code: '02',
				message: err
			})
		});
	}else{
        res.status(404).json({
            code: '02',
            message: errInput
        });
    }	
};

module.exports = controller;
