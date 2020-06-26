const model = require('../../config/model/index');
const {Op} = require('sequelize');
const controller = {};

controller.getAll = async function(req, res){
		await model.jenisSatuan.findAll({
			attributes: [['kode_jenis_satuan', 'kodeJenisSatuan'], ['nama_satuan', 'namaSatuan']]
		})
		.then((result)=>{
			if(result.length > 0){
				res.status(200).json({
					code: '01',
					message: 'Sukses',
					data: result
				});
			}else{
				res.status(200).json({
					code: '01',
					message: 'Tidak Ada Data'
				});
			}
		}).catch((err)=>{
			res.status(404).json({
				code: '02',
				message: err
			})
		});
	}

controller.getOne = async function(req, res){
		const search = req.params.search;
		await model.jenisSatuan.findAll({
			attributes: [['kode_jenis_satuan', 'kodeJenisSatuan'], ['nama_satuan', 'namaSatuan']],
			where:{
				[Op.or]: [{
					kode_jenis_satuan: {
						[Op.iLike]: '%' + search + '%'
					}
				},{
					nama_satuan: {
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
				res.status(204).json({
					code: '01',
					message: 'Tidak Ada Data'
				});
			}
		}).catch((err) => {
			res.status(404).json({
				code: '02',
				message: err
			})
		});
	}

module.exports = controller;
