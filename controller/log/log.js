const model = require('../../config/model/index');
const { Op } = require('sequelize');
const controller = {};
const path = require('path');
const moment = require('moment');
const {validationResult} = require('express-validator');

controller.getAll = async function (req, res) {

   try{
       let result = []
       let rs = await model.v_log.findAndCountAll({
          attribute: [
                      ['id_permohonan','id_permohonan'],
                      ['nama_layanan','nama_layanan'],
                      ['action_type','action_type'],
                      ['username','username'],
                      ['date_action','date_action'],
                      ['is_read','is_read']
          ],
          order:[['date_action','desc']]   
       });

       for (var i = 0; i < rs.count-1; i++) {
           result.push(rs.rows[i].dataValues)
       }

       res.status(200).json({
            code: '01',
            message: 'Sukses',
            data: result
        });

    }catch(err){
        res.status(404).json({
            code: '02',
            message: 'Error',
            data: err
        });
    }
};

module.exports = controller;
