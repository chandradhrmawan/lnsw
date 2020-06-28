const model = require('../../config/model/index');
const controller = {};
const {validationResult} = require('express-validator');
const db = require('../../config/database/database');

controller.getAll = async function(req, res){
	try{
		await model.M_DetailBarangPelabuhan.findAll()
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
			});
		});
	}catch(err){
		res.status(404).json({
			code: '02',
			message: err
		});
	}
}

controller.getOne = async function(req, res){
	try{
		const errInput = validationResult(req);
		if(errInput.isEmpty()){
			await model.M_DetailBarangPelabuhan.findAll({
				where: {
					id_detailbrg_pelabuhan: req.params.id_detailbrg_pelabuhan
				}
			}).then((result)=>{
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
				});
			});
		}else{
			res.status(404).json({
				code: '02',
				message: errInput
			});
		}
	}catch(err){
		res.status(404).json({
			code: '02',
			message: err
		});
	}
}

controller.insert = async function(req, res){
	const t = await db.transaction();
	try{
		const errInput = validationResult(req);
		if(errInput.isEmpty()){
			await model.M_DetailBarangPelabuhan.create({
				id_detailmasterlist_barang: req.body.id_detailmasterlist_barang,
				kd_negara: req.body.kd_negara,
				kd_pelabuhan: req.body.kd_pelabuhan,
				type: req.body.type
			},{
				transaction: t
			}).then((result)=>{
				t.commit();
				res.status(200).json({
					code: '01',
					message: 'Sukes'
				})
			}).catch((err)=>{
				t.rollback();
				res.status(404).json({
					code: '02',
					message: err
				});
			});
		}else{
			res.status(404).json({
				code: '02',
				message: errInput
			});
		}		
	}catch(err){
		res.status(404).json({
			code: '02',
			message: err
		});
	}
}

controller.update = async function(req, res){
	const t = await db.transaction();
	try{
		const errInput = validationResult(req);
		if(errInput.isEmpty()){
			await model.M_DetailBarangPelabuhan.update({
				id_detailmasterlist_barang: req.body.id_detailmasterlist_barang,
				kd_negara: req.body.kd_negara,
				kd_pelabuhan: req.body.kd_pelabuhan,
				type: req.body.type
			},{
				where: {
					id_detailbrg_pelabuhan: req.params.id_detailbrg_pelabuhan
				}
			},{
				transaction: t
			}).then((result)=>{
				t.commit();
				res.status(200).json({
					code: '01',
					message: 'Sukes'
				})
			}).catch((err)=>{
				t.rollback();
				res.status(404).json({
					code: '02',
					message: err
				});
			});
		}else{
			res.status(404).json({
				code: '02',
				message: errInput
			});
		}
	}catch(err){
		res.status(404).json({
			code: '02',
			message: err
		});
	}
}

controller.delete = async function(req, res){
	const t = await db.transaction();
	try{
		const errInput = validationResult(req);
		if(errInput.isEmpty()){
			await model.M_DetailBarangPelabuhan.destroy({
				where:{
					id_detailbrg_pelabuhan: req.params.id_detailbrg_pelabuhan
				}
			},{
				transaction: t
			}).then((result)=>{
				t.commit();
				res.status(200).json({
					code: '01',
					message: 'Sukes'
				})
			}).catch((err)=>{
				t.rollback();
				res.status(404).json({
					code: '02',
					message: err
				});
			});
		}else{
			res.status(404).json({
				code: '02',
				message: errInput
			});
		}
	}catch(err){
		res.status(404).json({
			code: '02',
			message: err
		});
	}
}



module.exports = controller;