const model = require('../../config/model/index');
const controller = {};
const path = require('path');
const {validationResult} = require('express-validator');

controller.getAll = async function(req, res){
	try{
		await model.M_LokasiProyek.findAll()
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
		});
	}
}
controller.getOne = async function(req, res){
	try{
		const errInput = validationResult(req);
		if(errInput.isEmpty()){
			await model.M_LokasiProyek.findAll({
				where: {
					id_lok_proyek: req.params.id_lok_proyek
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
	try{
		const errInput = validationResult(req);
		if(errInput.isEmpty()){
			await model.M_LokasiProyek.create({
				nib: req.body.nib,
				rt_rw_proyek: req.body.rt_rw_proyek,
				kelurahan: req.body.kelurahan,
				kd_kota: req.body.kd_kota,
				kode_post: req.body.kode_post
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
		console.log(req.body);
		const errInput = validationResult(req);
		if(errInput.isEmpty()){
			await model.M_LokasiProyek.update({
				nib: req.body.nib,
				rt_rw_proyek: req.body.rt_rw_proyek,
				kelurahan: req.body.kelurahan,
				kd_kota: req.body.kd_kota,
				kode_pos: req.body.kode_pos
			},{
				where: {
					id_lok_proyek: req.params.id_lok_proyek
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
controller.delete = async function(req, res){
	try{
		const errInput = validationResult(req);
			if(errInput.isEmpty()){
				await model.M_LokasiProyek.destroy({
					where: {
						id_lok_proyek: req.params.id_lok_proyek
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