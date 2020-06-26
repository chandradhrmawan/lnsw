const model = require('../../config/model/index');
const { Op } = require('sequelize');
const controller = {};

// controller.getAll = function(req, res) {
//     connection.query('SELECT td_berita_detail.berita_title AS beritaTitle, td_berita_detail.berita_header AS beritaHeader, td_berita_detail.berita_content AS beritaContent, td_berita_category.nm_category AS nmCategory, td_berita.wk_rekam AS wkRekam, td_berita_file.id_file AS file FROM td_berita JOIN td_berita_detail ON td_berita.id_berita = td_berita_detail.id_berita JOIN td_berita_category ON td_berita.berita_category = td_berita_category.id_category JOIN td_berita_file ON td_berita.id_berita = td_berita.id_berita GROUP BY td_berita.id_berita ORDER BY td_berita.wk_rekam DESC;', function (error, rows, fields){
//         if(error){
//             res.status(400).json({
//                 code: '02',
//                 message: error
//             });
//         } else {
//             res.status(200).json({
//                 code: '01',
//                 message: 'Sukses',
//                 data: rows
//             });
//         }
//     });
// };

controller.getHome = async function (req, res) {
    await model.berita.findAll({
        attributes: [['id_berita', 'id_berita'], ['wk_rekam', 'wk_rekam']],
        include: [
            {model: model.berita_file, as:'file', attributes: [['id_file', 'idFile']]},
            {model: model.berita_detail, as:'detail', attributes: [['berita_title', 'beritaTitle'],['berita_header', 'beritaHeader']]}
        ],
        limit : 5,
        order:[['id_berita','desc']]
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


controller.getAll = async function (req, res) {
    let limit           = 10;
    let page            = 0 + (req.query.page - 1) * limit;
    let response        = {}
    response.page       = req.query.page;
    console.log(req.query);
    try{
        response.result = await model.berita.findAndCountAll({
            attributes: [['id_berita', 'id_berita'], ['wk_rekam', 'wk_rekam']],
            include: [
                {model: model.berita_file, as:'file', attributes: [['id_file', 'idFile']]},
                {model: model.berita_detail, as:'detail', attributes: [['berita_title', 'beritaTitle'],['berita_header', 'beritaHeader']]}
            ],
            limit: limit,
            offset: page,
            order:[['id_berita','desc']]
        });

        response.total_page = Math.ceil(response.result.count/limit);
        res.status(200).json({
            code: '01',
            message: 'Sukses',
            data:response
          });
    }catch(err){
        res.status(400).json({
            code: '02',
            message: err,
            data: response,
          })
    }
};

controller.getDetail = async function (req, res) {
    // console.log(req.params);
    const id = req.params.id;
    await model.berita.findAll({
        attributes: [['id_berita', 'id_berita'], ['wk_rekam', 'wk_rekam']],
        include: [
            {model: model.berita_file, as:'file', attributes: [['id_file', 'idFile']]},
            {model: model.berita_detail, as:'detail', attributes: [['berita_title', 'beritaTitle'],['berita_header', 'beritaHeader'],['berita_content', 'beritaContent']]}
        ],
        where: {
            [Op.and]: [{
                id_berita: id
            }]
        }
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

// controller.getDetail = function(req, res) {
//     connection.query('SELECT td_berita_detail.berita_title AS beritaTitle, td_berita_detail.berita_header AS beritaHeader, td_berita_detail.berita_content AS beritaContent, td_berita_category.nm_category AS nmCategory, td_berita.wk_rekam AS wkRekam, td_berita_file.id_file AS file FROM td_berita JOIN td_berita_detail ON td_berita.id_berita = td_berita_detail.id_berita JOIN td_berita_category ON td_berita.berita_category = td_berita_category.id_category JOIN td_berita_file ON td_berita.id_berita = td_berita.id_berita WHERE td_berita.id_berita = 1 GROUP BY td_berita.id_berita;', function (error, rows, fields){
//         if(error){
//             res.status(400).json({
//                 code: '02',
//                 message: error
//             });
//         } else {
//             res.status(200).json({
//                 code: '01',
//                 message: 'Sukses',
//                 data: rows
//             });
//         }
//     });
// };



module.exports = controller;