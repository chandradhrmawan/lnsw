const model = require('../../config/model/index');
const { Op } = require('sequelize');
const controller = {};

controller.getAll = async function (req, res, next) {
    let limit           = req.query.limit;
    let page            = 0 + (req.query.page - 1) * limit;
    let search          = req.query.search;

    let response        = {}
    response.page       = req.query.page;
    try{

      response.result = await model.v_masterlist_head.findAndCountAll({
            attributes : [
                            ['no','no'],
                            ['id_permohonan','nomor_pengajuan'],
                            ['no_keputusan','nomor_keputusan'],
                            ['ur_permohonan','jenis_pengajuan'],
                            ['tgl_pengajuan','tanggal_pengajuan'],
                            ['ur_proses','status_proses'],
                            ['ur_status_perijinan','status_pengajuan']
                        ],
            limit: limit,
            offset:page,
            order:[['tgl_pengajuan','desc']],
            where: {
            [Op.or]: [
            {
                id_permohonan: {
                    [Op.iLike]: '%'+search+'%'
                }
            },
            {
                no_keputusan: {
                    [Op.iLike]: '%'+search+'%'
                }
            },
            {
                ur_permohonan: {
                    [Op.iLike]: '%'+search+'%'
                }
            },
            {
                ur_proses: {
                    [Op.iLike]: '%'+search+'%'
                }
            },
            {
                ur_status_perijinan: {
                    [Op.iLike]: '%'+search+'%'
                }
            }
            ]
            }
        });

        response.total_page = Math.ceil(response.result.count/limit);
        for (var i = 0; i < response.result.count; i++) {
            response.result.rows[i].dataValues.action = {
                status_proses:response.result.rows[i].dataValues.status_proses,
                nomor_pengajuan:response.result.rows[i].dataValues.nomor_pengajuan
            };
        }

       res.status(200).json({
         code: '01',
         message: 'Success',
         data:response
       });

    }catch(err){

        res.status(200).json({
          code: '01',
          message: 'Success',
          data: response,
        })
    }

}


module.exports = controller;