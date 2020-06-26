const model = require('../../config/model/index');
const { Op } = require('sequelize');
const controller = {};
const path = require('path');
const moment = require('moment');
const {validationResult} = require('express-validator');

controller.getAll = async function (req, res) {
    await model.satuan.findAll({
        attributes: [['kd_satuan', 'kodeSatuan'], ['ur_satuan', 'urSatuan']]
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
    await model.satuan.findAll({
        attributes: [['kd_satuan', 'kodeSatuan'], ['ur_satuan', 'urSatuan']],
        where: {
            [Op.or]: [{
                kd_satuan: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                ur_satuan: {
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
        await model.satuan.create({
            kd_satuan: req.body.kd_satuan,
            ur_satuan: req.body.ur_satuan
        }).then((result) => {
            res.status(201).json({
                code: '01',
                message: 'Jenis Satuan berhasil ditambahkan',
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
		await model.satuan.update({
			ur_satuan: req.body.ur_satuan
		},{
			where: {
				kd_satuan: req.params.kd_satuan
			}
		}).then(result => {
			res.status(200).json({
				code: '01',
				message: 'Jenis Satuan berhasil Diubah',
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
