const model = require('../../config/model/index');
const controller = {};
const path = require('path');
const {validationResult} = require('express-validator');

controller.getAll = async function(req, res){
	try{

	await model.M_DetailBarang.findAll({
		attribute: [
					['id_detailmasterlist_barang', 'id_detail_masterlist_barang'],
					['serial_num_urut','serial_num_urut'],
					['kd_hs', 'kd_hs'],
					['spesifikasi', 'spesifikasi'],
					['jml_satuan', 'jml_satuan'],
					['kd_satuan','kd_satuan'],
					['jenis_fasilitas', 'jenis_fasilitas'],
					['incoterm','incoterm'],
					['kd_valuta', 'kd_valuta'],
					['nilai','nilai'],
					['id_dokumen','id_dokumen'],
					['kd_detail_negara','kd_detail_negara'],
					['berlaku','berlaku'],
					['deskripsi_hs','deskripsi_hs'],
					['ur_barang','ur_barang']
				]
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
			await model.M_DetailBarang.findAll({
				attribute: [
							['id_detailmasterlist_barang', 'id_detail_masterlist_barang'],
							['serial_num_urut','serial_num_urut'],
							['kd_hs', 'kd_hs'],
							['spesifikasi', 'spesifikasi'],
							['jml_satuan', 'jml_satuan'],
							['kd_satuan','kd_satuan'],
							['jenis_fasilitas', 'jenis_fasilitas'],
							['incoterm','incoterm'],
							['kd_valuta', 'kd_valuta'],
							['nilai','nilai'],
							['id_dokumen','id_dokumen'],
							['kd_detail_negara','kd_detail_negara'],
							['berlaku','berlaku'],
							['deskripsi_hs','deskripsi_hs'],
							['ur_barang','ur_barang']
						],
				where: {
					id_detailmasterlist_barang: req.params.id_detailmasterlist_barang
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
		}else{
			res.status(404).json({
				code: '02',
				status: 'Data Tidak Valid'
			});
		}
	}catch(err){
		res.status(404).json({
			code: '02',
			message: err
		});
	}
}

controller.insert =  async function(req, res){
	try{
		const postData = req.body;
		const postDetailBarang = postData.detailBarang;
		const postBarangPelabuhan = postData.detailPelabuhan;
		await model.M_DetailBarang.create(postDetailBarang).then((result)=>{
			if(postBarangPelabuhan.length != 0){
				for(var i=0; i<postBarangPelabuhan.length; i++){
						Object.assign(postBarangPelabuhan[i], {id_detailmasterlist_barang: result.id_detailmasterlist_barang});
				}
				model.M_DetailBarangPelabuhan.bulkCreate(postBarangPelabuhan).then((result)=>{
					res.status(200).json({
						code: '01',
						message: 'Sukses'
					});
				});			
			}else{
				res.status(200).json({
					code: '01',
					message: 'Sukses'
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

controller.update = async function(req, res){
	try{
		console.log(req.body);
		const errInput = validationResult(req);
		if(errInput.isEmpty()){
			await model.M_DetailBarang.update({
				serial_num_urut: req.body.serial_num_urut,
				kd_hs: req.body.kd_hs,
				spesifikasi: req.body.spesifikasi,
				jml_satuan: req.body.jml_satuan,
				kd_satuan: req.body.kd_satuan,
				jenis_fasilitas: req.body.jenis_fasilitas,
				incoterm: req.body.incoterm,
				kd_valuta: req.body.kd_valuta,
				nilai: req.body.nilai,
				id_dokumen: req.body.id_dokumen,
				kd_detail_negara: req.body.kd_detail_negara,
				berlaku: req.body.berlaku,
				deskripsi_hs: req.body.deskripsi_hs,
				ur_barang: req.body.ur_barang
			},{
				where: {
					id_detailmasterlist_barang: req.params.id_detailmasterlist_barang
				}
			}).then((result)=>{
				res.status(200).json({
					code: '01',
					message: 'Sukses'
				});
			}).catch((err)=>{
				res.status(404).json({
					code: '02',
					message: err
				});
			});
		}else{
			res.status(404).json({
				code: '02',
				message: errInput.array()
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
			await model.M_DetailBarang.destroy({
				where: {
					id_detailmasterlist_barang: req.params.id_detailmasterlist_barang
				}
			}).then((result)=>{
				res.status(200).json({
					code: '01',
					message: 'Sukses'
				});
			}).catch((err)=>{
				res.status(404).json({
					code: '02',
					message: err
				});
			});
		}else{
			res.status(404).json({
				code: '02',
				message: 'Data Tidak Valid'
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