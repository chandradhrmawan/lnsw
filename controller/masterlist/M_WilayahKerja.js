const model = require('../../config/model/index');
const controller = {};
const path = require('path');
const {validationResult} = require('express-validator');
const db = require('../../config/database/database');

controller.getAll = async function(req, res){
	try{
		await model.M_WilayahKerja.findAll()
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
			await model.M_WilayahKerja.findAll({
				where: {
					id_wilayah_kerja: req.params.id_wilayah_kerja
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
			await model.M_WilayahKerja.create({
				kd_kota: req.body.kd_kota,
				rt_rw: req.body.rt_rw,
				alamat: req.body.alamat
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
			await model.M_WilayahKerja.update({
				kd_kota: req.body.kd_kota,
				rt_rw: req.body.rt_rw,
				alamat: req.body.alamat
			},{
				where: {
					id_wilayah_kerja: req.params.id_wilayah_kerja
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
		})
	}
}
controller.delete = async function(req, res){
	const t = await db.transaction();
	try{
		const errInput = validationResult(req);
			if(errInput.isEmpty()){
				await model.M_WilayahKerja.destroy({
					where: {
						id_wilayah_kerja: req.params.id_wilayah_kerja
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