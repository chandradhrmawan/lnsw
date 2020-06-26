const model = require('../../config/model/index');
const { Op } = require('sequelize');
const controller = {};
const path = require('path');
const moment = require('moment');
const {validationResult} = require('express-validator');

controller.getAll = async function (req, res) {
    await model.status_perijinan.findAll({
        attributes: [['kd_status_perijinan', 'kodePerijinan'], ['ur_status_perijinan', 'Perijinan']]
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
    await model.status_perijinan.findAll({
        attributes: [['kd_status_perijinan', 'kodePerijinan'], ['ur_status_perijinan', 'Perijinan']],
        where: {
            [Op.or]: [{
                kd_status_perijinan: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                ur_status_perijinan: {
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
        await model.status_perijinan.create({
            kd_status_perijinan: req.body.kd_status_perijinan,
            ur_status_perijinan: req.body.ur_status_perijinan
        }).then((result) => {
            res.status(201).json({
                code: '01',
                message: 'Status Perijinan berhasil ditambahkan',
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
		await model.status_perijinan.update({
			ur_status_perijinan: req.body.ur_status_perijinan
		},{
			where: {
				kd_status_perijinan: req.params.kd_status_perijinan
			}
		}).then(result => {
			res.status(200).json({
				code: '01',
				message: 'Status Perijinan berhasil Diubah',
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
