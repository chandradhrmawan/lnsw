const model = require('../../config/model/index');
const { Op } = require('sequelize');
const controller = {};
const path = require('path');
const moment = require('moment');
const {validationResult} = require('express-validator');

controller.getAll = async function (req, res) {
    await model.ga.findAll({
        attributes: [['kd_ga', 'kodeGA'], ['ur_ga', 'GA']]
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
    await model.ga.findAll({
        attributes: [['kd_ga', 'kodeGA'], ['ur_ga', 'GA']],
        where: {
            [Op.or]: [{
                kd_ga: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                ur_ga: {
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
        await model.ga.create({
            kd_ga: req.body.kd_ga,
            ur_ga: req.body.ur_ga
        }).then((result) => {
            res.status(200).json({
                code: '01',
                message: 'GA Berhasil Ditambah',
                data: result
            })
        }).catch((err) => {
            // console.log(err);
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
		await model.ga.update({
			ur_ga: req.body.ur_ga
		},{
			where: {
				kd_ga: req.params.kd_ga
			}
		}).then(result => {
			res.status(200).json({
				code: '01',
				message: 'GA berhasil Diubah',
			})
		}).catch(err => {
			res.status(400).json({
				code: '02',
				message: 'Error'
			})
		});
	}
};

module.exports = controller;