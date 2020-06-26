const model = require('../../config/model/index');
const { Op } = require('sequelize');
const controller = {};
const path = require('path');
const moment = require('moment');
const {validationResult} = require('express-validator');

controller.getAll = async function (req, res) {
    await model.kurs.findAll({
        attributes: [
            ['kd_kurs', 'kdKurs'],
            ['tgawal', 'tanggalAwal'],
            ['tgakhir', 'tanggalAkhir'],
            ['nilai', 'nilai'],
            ['ket', 'keterangan'],
            ['create_dt', 'create_date']
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
    await model.kurs.findAll({
        attributes: [
            ['kd_kurs', 'kdKurs'],
            ['tgawal', 'tanggalAwal'],
            ['tgakhir', 'tanggalAkhir'],
            ['nilai', 'nilai'],
            ['ket', 'keterangan'],
            ['create_dt', 'create_date']
        ],
        where: {
            [Op.or]: [{
                kd_kurs: {
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
        await model.kurs.create({
            kd_kurs: req.body.kd_kurs,
            tgawal: req.body.tgawal,
            tgakhir: req.body.nama_kota_kabupaten,
            nilai: req.body.nilai,
            ket: req.body.ket,
            create_dt: req.body.create_dt
        }).then((result) => {
            res.status(201).json({
                code: '01',
                message: 'Kurs berhasil ditambahkan',
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

controller.update = async function(req, res){
    const errInput = validationResult(req);
	if(errInput.isEmpty()){
		await model.kurs.update({
            tgawal: req.body.tgawal,
            tgakhir: req.body.nama_kota_kabupaten,
            nilai: req.body.nilai,
            ket: req.body.ket,
            create_dt: req.body.create_dt
		},{
			where: {
				kd_kurs: req.params.kd_kurs
			}
		}).then(result => {
			res.status(200).json({
				code: '01',
				message: 'Kurs berhasil Diubah',
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
