const model = require('../../config/model/index');
const controller = {};
const path = require('path');
const {validationResult} = require('express-validator');
const db = require('../../config/database/database');
const {Op} = require('sequelize');
const fs = require('fs');

controller.getAll = async function(req, res){
	try{
		await model.v_detail_by_header.findAll({
			order: [
				['id_detailmasterlist_barang', 'DESC']
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
						code: '02',
						message: 'Sukses',
						data: 'Tidak ada Data'
					});
				}
			});
	}catch(err){
		res.status(200).json({
			code: '02',
			message: err
		});
	}
}


controller.getOne = async function(req, res){
	let t = await db.transaction();
	try{
		await model.v_detail_by_header.findAll({
			where: {
				[Op.and]: [{
					id_permohonan: req.query.id_permohonan
				},{
					id_barang: req.query.id_barang
				}]
			}
		}).then(async (result)=>{
			const[data, metadata] = await db.query(`select
															SUM(A.nilai) as total
													from
															masterlist.td_detail_masterlistbarang A
													inner join
															masterlist.td_hdr_masterlistbarang B ON A.id_barang = B.id_barang
													where
															B.id_permohonan = :id_permohonan
													AND
															A.id_barang = :id_barang`,{
													replacements: {
														id_permohonan: req.query.id_permohonan,
														id_barang: req.query.id_barang
													}
												});
				if(data[0].total != 0){
					await model.masterListBarang.update({
						nilai: data[0].total
					},{
						where:{
							[Op.and]: [{
								id_permohonan: req.params.id_permohonan,
							},{
								id_barang: req.params.id_barang
							}]
						}
					},{
						transaction: t
					}).then((result)=>{
						t.commit();
					});
				}
				res.status(200).json({
					code: '01',
					message: 'Sukses',
					data: result
				});
		}).catch((err)=>{
			res.status(400).json({
				code: '02',
				message: 'Tidak dapat menampilkan data',
				data: []
			})
		});
	}catch(err){
		res.status(400).json({
			code: '02',
			message: 'Terjadi Kesalahan',
			data: []
		})
	}
}

controller.getOneUpdate = async function(req, res){
	await model.v_detail_by_header.findOne({
		where: {
			id_detailmasterlist_barang: req.query.id_detailmasterlist_barang
		}
	}).then(async (result1)=>{
			await model.v_detail_pelabuhan.findOne({
				where:{
					id_detailmasterlist_barang: req.query.id_detailmasterlist_barang
				}
			}).then(async (result2)=>{
				res.status(200).json({
					code: '01',
					message: 'Sukses',
					detailBarang: result1,
					detailPelabuhan: result2
				});
			}).catch((err)=>{
				res.status(400).json({
					code: '02',
					message: 'Gagal',
					detailBarang: [],
					detailPelabuhan: []
				});
			});
		}).catch((err)=>{
			res.status(400).json({
				code: '02',
				message: 'Gagal',
				detailBarang: [],
				detailPelabuhan: []
			});
		});
}

controller.insert =  async function(req, res){
	const t = await db.transaction();
	try{
		const errorValidation = validationResult(req);
		if(errorValidation.isEmpty()){
			const postData = req.body;
			const postDetailBarang = postData.detailBarang;
			const ObjectLength = Object.keys(postData).length;
			await model.M_DetailBarang.create(postDetailBarang,{
				transaction: t
			}).then((result)=>{
				const data = result;
				if(ObjectLength == 2){
					const postBarangPelabuhan = postData.detailPelabuhan;
					for(var i=0; i<postBarangPelabuhan.length; i++){
							Object.assign(postBarangPelabuhan[i], {id_detailmasterlist_barang: result.id_detailmasterlist_barang});
					}
					model.M_DetailBarangPelabuhan.bulkCreate(postBarangPelabuhan,{
						transaction: t
					}).then((result)=>{
						t.commit();
						res.status(200).json({
							code: '01',
							message: 'Sukses',
							data: data,
							data2: result
						});
					}).catch((err)=>{
						t.rollback();
						res.status(404).json({
							code: '02',
							message: 'Tidak Ada Data',
							data: []
						});
					});
				}else{
					t.commit();
					res.status(200).json({
						code: '01',
						message: 'Sukses',
						data: []
					});
				}
			}).catch((err)=>{
				t.rollback();
				res.status(404).json({
					code: '02',
					message: 'Tidak Berhasil Menambah Data',
					data: []				
				});
			});
		}else{
			res.status(404).json({
				code: '02',
				message: errorValidation.msg
			});
		}
	}catch(err){
		res.status(404).json({
			code: '02',
			message: 'Terjadi Kesalahan',
			data: []
		});
	}
}

controller.update = async function(req, res){
	const t = await db.transaction();
	try{
		const updateData = req.body;
		const updateDetailBarang = updateData.detailBarang;
		const ObjectLength = Object.keys(updateData).length;
		await model.M_DetailBarang.update(updateDetailBarang,{
			where: {
				id_detailmasterlist_barang: req.params.id_detailmasterlist_barang
			}
		},{
			trasaction: t
		}).then(async (result)=>{
			var berhasil = 0;
			const updateBarangPelabuhan = updateData.detailPelabuhan;
			const deletePelabuhan = updateData.deletePelabuhan;
			for(var index=1; index< ObjectLength; index++){
				if(index == 1){
					if(updateBarangPelabuhan.length != 0){
						for(var i=0 ; i<updateBarangPelabuhan.length; i++){
							if(updateBarangPelabuhan[i].id_detailbrg_pelabuhan != ''){
								const validasi = await model.M_DetailBarangPelabuhan.update(updateBarangPelabuhan[i],{
									where:{
											id_detailbrg_pelabuhan: updateBarangPelabuhan[i].id_detailbrg_pelabuhan
										}
									},{
										trasaction: t
									});
							}else{
								delete updateBarangPelabuhan[i].id_detailbrg_pelabuhan;
								Object.assign(updateBarangPelabuhan[i], {id_detailmasterlist_barang: req.params.id_detailmasterlist_barang});
								const validasi = await model.M_DetailBarangPelabuhan.create(updateBarangPelabuhan[i],{
									transaction: t
								});
							}
						}
					}
				}else{
					if(deletePelabuhan.length != 0){
						for(var i=0; i<deletePelabuhan.length; i++){
							await model.M_DetailBarangPelabuhan.destroy({
								where: {
									id_detailbrg_pelabuhan: deletePelabuhan[i].id_detailbrg_pelabuhan
								}
							},{
								transaction: t
							});
						}
					}
				}
			}
					
			t.commit();
			res.status(200).json({
				code: '01',
				message: 'Sukses'
			});
		}).catch((err)=>{
			t.rollback();
			res.status(404).json({
				code: '02',
				message: 'Gagal',
				data: []
			})
		}); 
	}catch(err){
		res.status(404).json({
			status: '02',
			message: 'Terjadi Kesalahan',
			data: []
		});
	}
}

controller.delete = async function(req, res){
	const t = await db.transaction();
	await db.query(`SELECT
							*
					FROM
							masterlist.td_detail_masterlistbarang A
					LEFT JOIN
							masterlist.td_dokumen B ON A.id_dokumen = B.id_dokumen
					WHERE
							A.id_detailmasterlist_barang = :id_detailmasterlist_barang`,{
					  			replacements: {
									id_detailmasterlist_barang: req.params.id_detailmasterlist_barang
								}
							}).then(async(result)=>{
								const getAll = result[0][0]; 
								if(fs.existsSync(getAll.filename_dokumen)){
									fs.unlinkSync(getAll.filename_dokumen);
								}
								await model.dokumen.destroy({
									where: {
										id_dokumen: getAll.id_dokumen
									}
								},{
									transaction: t
								}).then(async(result)=>{
									await model.M_DetailBarang.destroy({
										where: {
											id_detailmasterlist_barang: req.params.id_detailmasterlist_barang
										}
									},{
										transaction: t
									}).then(async(result)=>{
										await model.M_DetailBarangPelabuhan.destroy({
											where: {
												id_detailmasterlist_barang: req.params.id_detailmasterlist_barang
											}
										},{
											transaction: t
										}).then((result)=>{
											t.commit();
											res.status(200).json({
												code: '01',
												message: 'Sukses'
											});
										}).catch((err)=>{
											t.rollback();
											res.status(200).json({
											code: '02',
											message: 'Tik dapat Menghapus data',
											data: []
											});
										});
									}).catch((err)=>{
										res.status(404).json({
										code: '02',
										message: 'Tidak dapat menghapus data dokumen',
										data: []
										})
									});
								});
							});
}

function SanitizeDetailForm(params){
}
module.exports = controller;