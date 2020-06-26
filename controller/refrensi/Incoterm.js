const model = require('../../config/model/index');
const { Op } = require('sequelize');
const controller = {};
const path = require('path');
const moment = require('moment');
const {validationResult} = require('express-validator');

controller.getAll = async function (req, res) {
    await model.incoterm.findAll({
        attributes: [['incoterm', 'Incoterm'], ['ur_incoterm', 'urIncoterm']]
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
    await model.incoterm.findAll({
        attributes: [['incoterm', 'Incoterm'], ['ur_incoterm', 'urIncoterm']],
        where: {
            [Op.or]: [{
                incoterm: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                ur_incoterm: {
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
        await model.incoterm.create({
            incoterm: req.body.incoterm,
            ur_incoterm: req.body.ur_incoterm
        }).then((result) => {
            res.status(201).json({
                code: '01',
                message: 'Incoterm berhasil ditambahkan',
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
		await model.incoterm.update({
			ur_incoterm: req.body.ur_incoterm
		},{
			where: {
				incoterm: req.params.incoterm
			}
		}).then(result => {
			res.status(200).json({
				code: '01',
				message: 'Incoterm berhasil Diubah',
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
