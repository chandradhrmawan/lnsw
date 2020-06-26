const model = require('../../config/model/index');
const { Op } = require('sequelize');
const controller = {};
const path = require('path');
const moment = require('moment');
const {validationResult} = require('express-validator');

controller.getAll = async function (req, res) {
    await model.valuta.findAll({
        attributes: [['kd_valuta', 'kodeValuta'], ['ur_valuta', 'urValuta']]
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
    await model.valuta.findAll({
        attributes: [['kd_valuta', 'kodeValuta'], ['ur_valuta', 'urValuta']],
        where: {
            [Op.or]: [{
                kd_valuta: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                ur_valuta: {
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
        await model.valuta.create({
            kd_valuta: req.body.kd_valuta,
            ur_valuta: req.body.ur_valuta
        }).then((result) => {
            res.status(201).json({
                code: '01',
                message: 'Valuta berhasil ditambahkan',
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
		await model.valuta.update({
			ur_valuta: req.body.ur_valuta
		},{
			where: {
				kd_valuta: req.params.kd_valuta
			}
		}).then(result => {
			res.status(200).json({
				code: '01',
				message: 'Valuta berhasil Diubah',
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
