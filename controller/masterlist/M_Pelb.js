const model = require('../../config/model/index');
const controller = {};
const path = require('path');
const {validationResult} = require('express-validator');

controller.getAll = async function(req, res){
	try{
		await model.M_Pelb.findAll()
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
								message: 'Sukses',
								data: 'Tidak ada data'
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
		})
	}
}
controller.getOne = async function(req, res){
	try{
		const errInput = validationResult(req);
		if(errInput.isEmpty()){
			await model.M_Pelb.findAll({
				where: {
					id_pelb_masterlist: req.params.id_pelb_masterlist
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
		})
	}
}
controller.insert = async function(req, res){
	try{
		const errInput = validationResult(req);
		if(errInput.isEmpty()){
			await model.M_Pelb.create({
				kd_pelabuhan: req.body.kd_pelabuhan,
				type_pelabuhan: req.body.type_pelabuhan,
				id_permohonan: req.body.id_permohonan
			}).then((result)=>{
				res.status(200).json({
					code: '01',
					message: 'Sukes'
				})
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
		})
	}
}
controller.update = async function(req, res){
	try{
		const errInput = validationResult(req);
		if(errInput.isEmpty()){
			await model.M_Pelb.update({
				kd_pelabuhan: req.body.kd_pelabuhan,
				type_pelabuhan: req.body.type_pelabuhan,
				id_permohonan: req.body.id_permohonan
			},{
				where: {
					id_pelb_masterlist: req.params.id_pelb_masterlist
				}
			}).then((result)=>{
				res.status(200).json({
					code: '01',
					message: 'Sukes'
				})
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
controller.delete = async function(req, res){
	try{
	const errInput = validationResult(req);
		if(errInput.isEmpty()){
			await model.M_Pelb.destroy({
				where: {
					id_pelb_masterlist: req.params.id_pelb_masterlist
				}
			}).then((result)=>{
				res.status(200).json({
					code: '01',
					message: 'Sukes'
				})
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
		})
	}
}

module.exports = controller;