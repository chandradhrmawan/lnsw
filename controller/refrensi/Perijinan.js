const model = require('../../config/model/index');
const { Op } = require('sequelize');
const controller = {};
const path = require('path');
const moment = require('moment');
const {validationResult} = require('express-validator');

controller.getAll = async function (req, res) {
    await model.perijinan.findAll({
        attributes: [['kd_perijinan', 'kodePerijinan'], ['ur_perijinan', 'Perijinan'], ['kd_ga', 'kodeGA']]
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
    await model.perijinan.findAll({
        attributes: [['kd_perijinan', 'kodePerijinan'], ['ur_perijinan', 'Perijinan'], ['kd_ga', 'kodeGA']],
        where: {
            [Op.or]: [{
                kd_perijinan: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                ur_perijinan: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                kd_ga: {
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
        await model.perijinan.create({
            kd_perijinan: req.body.kd_perijinan,
            ur_perijinan: req.body.ur_perijinan,
            kd_ga: req.body.kd_ga
        }).then((result) => {
            res.status(201).json({
                code: '01',
                message: 'Perijinan berhasil ditambahkan',
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
		await model.perijinan.update({
            ur_perijinan: req.body.ur_perijinan,
            kd_ga: req.body.kd_ga
		},{
			where: {
				kd_perijinan: req.params.kd_perijinan
			}
		}).then(result => {
			res.status(200).json({
				code: '01',
				message: 'Perijinan berhasil Diubah',
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
