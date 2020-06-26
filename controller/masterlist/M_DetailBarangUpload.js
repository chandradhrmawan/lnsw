const model = require('../../config/model/index');
const { Op } = require('sequelize');
const controller = {};
const path = require('path');
const xlsx = require('xlsx');
const {validationResult} = require('express-validator');
const db = require('../../config/database/database');

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
		});
	}
}


controller.getOne = async function(req, res){
	try{
		const errInput = validationResult(req);
		if(errInput.isEmpty()){
			const [result, metadata] = await db.query(`SELECT
									*
							FROM
									masterlist.td_detail_masterlistbarang A
							LEFT JOIN
									masterlist.td_hdr_masterlistbarang B
							ON
									A.id_barang = B.id_barang
							LEFT JOIN
									refrensi.tr_satuan C 
							ON
									A.kd_satuan = C.kd_satuan
							WHERE
									B.id_permohonan = :id_permohonan
							AND
									A.id_barang = :id_barang`,{
										replacements: {
											id_permohonan: req.params.id_permohonan,
											id_barang: req.params.id_barang
										}
									});
				if(result.length > 0){
					res.status(200).json({
						code: '01',
						message: 'Sukses',
						data: result
					})
				}else{
					res.status(200).json({
						code:'01',
						message: 'Tidak ada data'
					});
				}
			}else{
				res.status(404).json({
					code: '02',
					message: err
				})
			}
	}catch(err){
		res.status(404).json({
			code: '01',
			message: err
		});
	}
}

controller.insert =  async function(req, res){
	try{
		console.log(req.file);
		const modelBarangPelabuhan = [model.M_DetailBarang, model.M_DetailBrangPelabuhan];
		const valExt = path.extname(req.file.filename);
		const getKdHs = [];
		if(valExt == '.xlsx' || valExt == '.xls'){
			const workbook = xlsx.readFile(req.file.path);
			const sheet_name_list = workbook.SheetNames;
			const getIdMasterlisBarang = [];
			for(var i=0; i<sheet_name_list.length; i++){
				const xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[i]]);
				if(i == 1){
					console.log(xlData.length);
					for(var j=0; j<xlData.length; j++){
						Object.assign(xlData[j], {id_detailmasterlist_barang: getIdMasterlisBarang[j]} );
					}
					await model.M_DetailBarangPelabuhan.bulkCreate(xlData).then((result)=>{
						res.status(200).json({
							code: '01',
							message: 'Sukses'
						})
					}).catch((err)=>{
						res.status(404).json({
							code: '02',
							message: err
						});
					});

				}else{
					for(var j=0; j<xlData.length; j++){
						Object.assign(xlData[j], {id_barang: req.body.id_barang, kd_status_detailbarang: '2'});
						getKdHs[j] = xlData[j].kd_hs;
					}
						const validasi = await model.M_DetailBarang.bulkCreate(xlData);
						if(validasi){
							console.log(getKdHs);
								const [results, metadata] = await db.query(`SELECT 
																				A.id_detailmasterlist_barang
																		   FROM 
																		   		masterlist.td_detail_masterlistbarang A
																		   	WHERE
																		   		A.kd_hs IN (:kd_hs)
																		   	AND
																		   		A.id_barang = :id_barang`,{
																		   			replacements: {
																		   				id_barang: req.body.id_barang,
																		   				kd_hs: getKdHs
																		   			}
																		   		});
								for(var j=0; j<results.length; j++){
									getIdMasterlisBarang[j] = results[j].id_detailmasterlist_barang;
								}
								console.log(getIdMasterlisBarang);
								// console.log(getIdMasterlisBarang[j]);
						}else{
							console.log('Gagal');
						}
				}
			}
		}else{
			res.status(404).json({
				code: '02',
				message: 'File excel yang hanya diperbolehkan diupload'
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
	try{
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
				message: errInput.array()
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