const model = require('../../config/model/index');
const { Op } = require('sequelize');
const controller = {};
const path = require('path');
const moment = require('moment');
const {validationResult} = require('express-validator');

controller.getAll = async function (req, res) {
   await model.jenisBarang.findAll({
        attributes: [
            ['kd_jenis_barang', 'kdJenisBarang'],
            ['ur_jenis_barang', 'urJenisBarang']
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

module.exports = controller;
