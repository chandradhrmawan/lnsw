const model = require('../../config/model/index');
const { Op } = require('sequelize');
const controller = {};
const path = require('path');
const moment = require('moment');
const {validationResult} = require('express-validator');

controller.getAll = async function (req, res) {
    await model.provinsi.findAll({
        attributes: [['kd_provinsi', 'kodeProvinsi'], ['ur_provinsi', 'Provinsi']]
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
    await model.provinsi.findAll({
        attributes: [['kd_provinsi', 'kodeProvinsi'], ['ur_provinsi', 'Provinsi']],
        where: {
            [Op.or]: [{
                kd_provinsi: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                ur_provinsi: {
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
        await model.provinsi.create({
            kd_provinsi: req.body.kd_provinsi,
            ur_provinsi: req.body.ur_provinsi
        }).then((result) => {
            res.status(201).json({
                code: '01',
                message: 'Provinsi berhasil ditambahkan',
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
		await model.provinsi.update({
			ur_provinsi: req.body.ur_provinsi
		},{
			where: {
				kd_provinsi: req.params.kd_provinsi
			}
		}).then(result => {
			res.status(200).json({
				code: '01',
				message: 'Provinsi berhasil Diubah',
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
