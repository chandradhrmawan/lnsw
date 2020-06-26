const model = require('../../config/model/index');
const { Op } = require('sequelize');
const controller = {};
const path = require('path');
const moment = require('moment');
const {validationResult} = require('express-validator');

controller.getAll = async function (req, res) {
    await model.hscode.findAll({
        attributes: [['id_hscode', 'idHscode'], 
                    ['kd_hs', 'kodeHs'], 
                    ['hd_code_format', 'codeFormat'], 
                    ['id_takik', 'idTakik'], 
                    ['uraian_id', 'uraianID'], 
                    ['uraian_en', 'uraianEN'], 
                    ['bm_mfn', 'bmMfn'], 
                    ['no_skep', 'noSkep'], 
                    ['tanggal_skep', 'tanggalSkep'], 
                    ['berlaku', 'berlaku'], 
                    ['fl_use', 'flUse'], 
                    ['create_dt', 'cretaeDt']]
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
    // console.log(req.body.id);
    var whereStatement = {};
    if (req.body.id == "kd_hs"){
        const search_kdhs = req.params.search;
        whereStatement = {
            [Op.or]: [ {
                kd_hs: {
                    [Op.iLike]: '%' + search_kdhs + '%'
                }
            }]
        };
    }else if (req.body.id == "uraian_id"){
        const search_uraianid = req.params.search;
        whereStatement = {
            [Op.or]: [ {
                uraian_id: {
                    [Op.iLike]: '%' + search_uraianid + '%'
                }
            }]
        };
    }else{
        const search_uraianen = req.params.search;
        whereStatement = {
            [Op.or]: [ {
                uraian_en: {
                    [Op.iLike]: '%' + search_uraianen + '%'
                }
            }]
        };
    }
    // const search = req.params.search;
    await model.hscode.findAll({
        attributes: [['id_hscode', 'idHscode'], 
                    ['kd_hs', 'kodeHs'], 
                    ['hd_code_format', 'codeFormat'], 
                    ['id_takik', 'idTakik'], 
                    ['uraian_id', 'uraianID'], 
                    ['uraian_en', 'uraianEN'], 
                    ['bm_mfn', 'bmMfn'], 
                    ['no_skep', 'noSkep'], 
                    ['tanggal_skep', 'tanggalSkep'], 
                    ['berlaku', 'berlaku'], 
                    ['fl_use', 'flUse'], 
                    ['create_dt', 'cretaeDt']],
        where: whereStatement
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
        await model.hscode.create({
            id_hscode: req.body.id_hscode,
            kd_hs: req.body.kd_hs,
            hd_code_format: req.body.hd_code_format,
            id_takik: req.body.id_takik,
            uraian_id: req.body.uraian_id,
            uraian_en: req.body.uraian_en,
            bm_mfn: req.body.bm_mfn,
            no_skep: req.body.no_skep,
            tanggal_skep: req.body.tanggal_skep,
            berlaku: req.body.berlaku,
            fl_use: req.body.fl_use,
            create_dt: req.body.create_dt
        }).then((result) => {
            res.status(201).json({
                code: '01',
                message: 'HSCODE berhasil ditambahkan',
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
		await model.hscode.update({
            kd_hs: req.body.kd_hs,
            hd_code_format: req.body.hd_code_format,
            id_takik: req.body.id_takik,
            uraian_id: req.body.uraian_id,
            uraian_en: req.body.uraian_en,
            bm_mfn: req.body.bm_mfn,
            no_skep: req.body.no_skep,
            tanggal_skep: req.body.tanggal_skep,
            berlaku: req.body.berlaku,
            fl_use: req.body.fl_use,
            create_dt: req.body.create_dt
		},{
			where: {
				id_hscode: req.params.id_hscode
			}
		}).then(result => {
			res.status(200).json({
				code: '01',
				message: 'Hscode berhasil Diubah',
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
