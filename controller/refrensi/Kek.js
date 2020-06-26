const model = require('../../config/model/index');
const { Op } = require('sequelize');
const controller = {};
const path = require('path');
const moment = require('moment');
const { validationResult } = require('express-validator');

controller.getAll = async function (req, res) {
    await model.tr_kek.findAll({
        attributes: [
            ['kd_kek', 'KodeKEK'],
            ['ur_kek', 'UrKEK'],
            ['kd_kota', 'KodeKota']
        ]
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

controller.findKek = async function (req, res, next) {
    const search = req.params.search;
    await model.tr_kek.findAll({
        attributes: [
            ['kd_kek', 'KodeKEK'],
            ['ur_kek', 'UrKEK'],
            ['kd_kota', 'KodeKota']
        ],
        where: [{
            ur_kek: {
                [Op.iLike]: '%' + search + '%'
            }
        }]
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
    if (errInput.isEmpty()) {
        await model.tr_kek.create({
            ur_kek: req.body.KekUraian,
            kd_kota: req.body.KodeKota
        }).then((result) => {
            res.status(201).json({
                code: '01',
                message: 'KEK berhasil ditambahkan',
                data: result
            })
        }).catch((err) => {
            res.status(404).json({
                code: '02',
                message: err
            })
        });
    } else {
        res.status(404).json({
            code: '02',
            message: errInput
        });
    }
};

controller.update = async function (req, res) {
    const errInput = validationResult(req);
    if (errInput.isEmpty()) {
        await model.tr_kek.update({
            ur_kek: req.body.KekUraian,
            kd_kota: req.body.KodeKota
        }, {
            where: {
                kd_kek: req.params.KekKode
            }
        }).then(result => {
            res.status(200).json({
                code: '01',
                message: 'Kota berhasil Diubah',
            })
        }).catch(err => {
            res.status(404).json({
                code: '02',
                message: err
            })
        });
    } else {
        res.status(404).json({
            code: '02',
            message: errInput
        });
    }
};

module.exports = controller;
