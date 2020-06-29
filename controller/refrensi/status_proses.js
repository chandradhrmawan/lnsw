const model = require('../../config/model/index');
const { Op } = require('sequelize');
const controller = {};
const path = require('path');
const moment = require('moment');
const {validationResult} = require('express-validator');

controller.getAll = async function (req, res) {
    await model.statusProses.findAll({
        attributes: [
                    ['kode_proses', 'kode_proses'], 
                    ['ur_proses', 'ur_proses']
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
    const kode_proses = req.query.kode_proses;
    await model.statusProses.findOne({
        attributes: [
                        ['kode_proses', 'kode_proses'], 
                        ['ur_proses', 'ur_proses']
                    ],
        where: {
            kode_proses:kode_proses
        }
    }).then((result) => {
        res.status(200).json({
            code: '01',
            message: 'Sukses',
            data: result
        })
    }).catch((err) => {
        res.status(400).json({
            code: '02',
            message: err
        })
    });
};

controller.post = async function (req, res) {

   
};

controller.update = async function(req, res){
    
};

module.exports = controller;
