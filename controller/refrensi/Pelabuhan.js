const model = require('../../config/model/index');
const { Op } = require('sequelize');
const controller = {};
const path = require('path');
const moment = require('moment');
const {validationResult} = require('express-validator');

controller.getAll = async function (req, res) {
    await model.pelabuhan.findAll({
        attributes: [['kd_pelabuhan', 'KodePelabuhan'], ['ur_pelabuhan', 'Pelabuhan']]
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
    await model.pelabuhan.findAll({
        attributes: [['kd_pelabuhan', 'KodePelabuhan'], ['ur_pelabuhan', 'Pelabuhan']],
        where: {
            [Op.or]: [{
                kd_pelabuhan: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                ur_pelabuhan: {
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
        await model.pelabuhan.create({
            kd_pelabuhan: req.body.kd_pelabuhan,
            ur_pelabuhan: req.body.ur_pelabuhan
        }).then((result) => {
            res.status(201).json({
                code: '01',
                message: 'Pelabuhan berhasil ditambahkan',
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
		await model.pelabuhan.update({
			ur_pelabuhan: req.body.ur_pelabuhan
		},{
			where: {
				kd_pelabuhan: req.params.kd_pelabuhan
			}
		}).then(result => {
			res.status(200).json({
				code: '01',
				message: 'Pelabuhan berhasil Diubah',
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
