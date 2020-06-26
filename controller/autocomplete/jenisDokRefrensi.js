const model = require('../../config/model/index');
const {Op} = require('sequelize');
const controller = {};

controller.getAll = async function(req,res){
    await model.jenisDok.findAll({
        attributes: [['kodejenisdokrerensi', 'KodeJenisDok'], ['namajenisdokreferensi', 'Nama'], ['flagberlaku', 'flag']],
    })
        .then((result) => {
            if (result.length > 0) {
                res.status(200).json({
                    code: '01',
                    message: 'Sukses',
                    data: result
                });
            } else {
                res.status(200).json({
                    code: '01',
                    message: 'Tidak Ada Data'
                })
            }
        }).catch((err) => {
            res.status(400).json({
                code: '02',
                message: err
            });
        });	
}
	
controller.getOne = async function(req, res){
	const search = req.params.search;
    await model.jenisDok.findAll({
        attributes: [['kodejenisdokrerensi', 'KodeJenisDok'], ['namajenisdokreferensi', 'Nama'], ['flagberlaku', 'flag']],
        where: {
            [Op.or]: [{
                kodejenisdokrerensi: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                namajenisdokreferensi: {
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
            res.status(200).json({
                code: '01',
                message: 'Tidak Ada Data'
            });
        }
    }).catch((err) => {
        // console.log(err);
        res.status(400).json({
            code: '02',
            message: err
        });
    });
}

module.exports = controller;