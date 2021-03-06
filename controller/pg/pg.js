const model = require('../../config/model/index');
const view = require('../../config/model/view/v_masterlist');
const { Op } = require('sequelize');
const controller = {};


controller.getView = async (req,res,next) => {
    let id_permohonan = req.query.id_permohonan;
    let response = {}
    await view.v_pengajuan_masterlist.findAll({
        where : {
            nomor_pengajuan : id_permohonan
        }
    })
    .then(async(ress)=> {
        response.data_pengajuan = (ress[0]) ? ress[0].dataValues : [];
        await view.v_dokumen_masterlist.findAll({
            where : {
                id_permohonan : id_permohonan
            }
        }).then((ress1)=>{
            console.log(ress1.length);

            let doc = []
            if(ress1.length > 0){
                for (var i = 0; i < ress1.length; i++) {
                    doc.push(ress1[i].dataValues);
                }
            }
            response.dokumen = doc;
            res.status(200).json({
                code: '01',
                message: 'Success',
                data:response
            });
        }).catch(err => {
            res.status(400).json({
                code: '02',
                message: 'Error',
                data:err
            });
        })
    }).catch(err => {
        res.status(400).json({
             code: '02',
             message: 'Error',
             data:err
        });
    })
}

controller.getAll = async function (req, res, next) {
    
    try{

    let limit           = req.query.limit;
    let page            = 0 + (req.query.page - 1) * limit;
    let search          = req.query.search;

    let response        = {}
    response.page       = req.query.page;

      response.result = await model.v_masterlist_head.findAndCountAll({
            attributes : [
                            ['no','no'],
                            ['id_permohonan','nomor_pengajuan'],
                            ['no_keputusan','nomor_keputusan'],
                            ['ur_permohonan','jenis_pengajuan'],
                            ['tgl_pengajuan','tanggal_pengajuan'],
                            ['ur_proses','status_proses'],
                            // ['ur_status_perijinan','status_pengajuan']
                            ['ur_proses','status_pengajuan'],
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
         message: 'Success1',
         data:response
       });

    }catch(err){

        res.status(200).json({
          code: '01',
          message: 'Success2',
          data: response,
        })
    }

}


module.exports = controller;