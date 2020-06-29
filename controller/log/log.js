const model = require('../../config/model/index');
const { Op } = require('sequelize');
const controller = {};
const path = require('path');
const moment = require('moment');
const { validationResult } = require('express-validator');
const socket = require( 'socket.io' );

controller.test = async function (req, res) {
    await model.v_log.findAll()
    .then((result) => {
      res.status(200).json({
            code: '01',
            message: 'Sukses',
            data: result
    });
   });
}

controller.getAll = async function (req, res) {

    try {
        let result = []
        let rs = await model.v_log.findAndCountAll({
            attribute: [
                ['id_permohonan', 'id_permohonan'],
                ['nama_layanan', 'nama_layanan'],
                ['action_type', 'action_type'],
                ['username', 'username'],
                ['date_action', 'date_action'],
                ['is_read', 'is_read']
            ],
            order: [['date_action', 'desc']]
        });

        for (var i = 0; i < rs.count - 1; i++) {
            result.push(rs.rows[i].dataValues)
        }

        res.status(200).json({
            code: '01',
            message: 'Sukses',
            data: result
        });

    } catch (err) {
        res.status(404).json({
            code: '02',
            message: 'Error',
            data: err
        });
    }
};

controller.getFind = async function (req, res) {
    let search = req.query.search;
    // console.log(search);
    try {
        let result = []
        await model.v_log.findAll({
            attribute: [
                ['id_permohonan', 'id_permohonan'],
                ['nama_layanan', 'nama_layanan'],
                ['action_type', 'action_type'],
                ['username', 'username'],
                ['date_action', 'date_action'],
                ['is_read', 'is_read']
            ],
            where: {
                [Op.or]: [{
                    id_permohonan: {
                        [Op.iLike]: '%' + search + '%'
                    }
                }, {
                    username: {
                        [Op.iLike]: '%' + search + '%'
                    }
                }, {
                    action_type: {
                        [Op.iLike]: '%' + search + '%'
                    }
                },
                {
                    date_action: {
                        [Op.iLike]: '%' + search + '%'
                    }
                }]
            },
            order: [['date_action', 'desc']]
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
        });

    } catch (err) {
        res.status(404).json({
            code: '02',
            message: 'Error',
            data: err
        });
    }
};
module.exports = controller;
