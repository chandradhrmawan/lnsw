const model = require('../../config/model/index');
const { Op } = require('sequelize');
const controller = {};
const path = require('path');
const moment = require('moment');
const {validationResult} = require('express-validator');

controller.getAll = async function (req, res) {
    await model.jenis_dokumen.findAll({
        attributes: [['kd_dokumen', 'kodeDokumen'], ['ur_jenis_dokumen', 'jenisDokumen']]
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
                })
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
    await model.jenis_dokumen.findAll({
        attributes: [['kd_dokumen', 'kodeDokumen'], ['ur_jenis_dokumen', 'jenisDokumen']],
        where: {
            [Op.or]: [{
                kd_dokumen: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                ur_jenis_dokumen: {
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
        // console.log(err);
        res.status(400).json({
            code: '02',
            message: err
        })
    });
};

controller.post = async function (req, res) {
    const errInput = validationResult(req);
    if(errInput.isEmpty()){
        await model.jenis_dokumen.create({
            kd_dokumen: req.body.kd_dokumen,
            ur_jenis_dokumen: req.body.ur_jenis_dokumen
        }).then((result) => {
            res.status(201).json({
                code: '01',
                message: 'Jenis Dokumen berhasil ditambahkan',
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
		await model.jenis_dokumen.update({
			ur_jenis_dokumen: req.body.ur_jenis_dokumen
		},{
			where: {
				kd_dokumen: req.params.kd_dokumen
			}
		}).then(result => {
			res.status(200).json({
				code: '01',
				message: 'Jenis Dokumen berhasil Diubah',
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
