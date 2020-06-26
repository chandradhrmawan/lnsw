const model = require('../../config/model/index');
const { Op } = require('sequelize');
const controller = {};
const path = require('path');
const moment = require('moment');
const {validationResult} = require('express-validator');

controller.getAll = async function (req, res) {
    await model.negara.findAll({
        attributes: [['kd_negara', 'KodeNegara'], ['ur_negara', 'Negara']]
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
    await model.negara.findAll({
        attributes: [['kd_negara', 'KodeNegara'], ['ur_negara', 'Negara']],
        where: {
            [Op.or]: [{
                kd_negara: {
                    [Op.iLike]: '%'+ search + '%'
                }
            }, {
                ur_negara: {
                    [Op.iLike]: '%'+ search + '%'
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
        await model.negara.create({
            kd_negara: req.body.kd_negara,
            ur_negara: req.body.ur_negara
        }).then((result) => {
            res.status(201).json({
                code: '01',
                message: 'Negara berhasil ditambahkan',
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
		await model.negara.update({
			ur_negara: req.body.ur_negara
		},{
			where: {
				kd_negara: req.params.kd_negara
			}
		}).then(result => {
			res.status(200).json({
				code: '01',
				message: 'Negara berhasil Diubah',
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
