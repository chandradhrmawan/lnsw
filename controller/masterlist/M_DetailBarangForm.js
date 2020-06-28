const model = require('../../config/model/index');
const controller = {};
const path = require('path');
const {validationResult} = require('express-validator');
const db = require('../../config/database/database');

controller.getAll = async function(req, res){
	try{
		await db.query(`SELECT
							DISTINCT
								A.*,
								B.hd_code_format,
								B.id_takik,
								B.uraian_id,
								B.uraian_en,
								B.bm_mfn,
								B.no_skep,
								B.tanggal_skep,
								B.berlaku,
								B.fl_use,
								B.create_dt,
								C.ur_satuan,
								D.ur_incoterm,
								E.ur_valuta,
								F.kd_dokumen,
								F.nomor_dokumen,
								F.tgl_dokumen,
								F.filename_dokumen,
								F.id_permohonan,
								F.no_seri_dokumen,
								F.nib
						FROM
								masterlist.td_detail_masterlistbarang A
						LEFT JOIN
								refrensi.tr_hscode B ON A.kd_hs = B.kd_hs
						LEFT JOIN
								refrensi.tr_satuan C ON A.kd_satuan = C.kd_satuan
						LEFT JOIN
								refrensi.tr_incoterm D ON A.incoterm = D.incoterm
						LEFT JOIN
								refrensi.tr_valuta E ON A.kd_valuta = E.kd_valuta
						LEFT JOIN
								masterlist.td_dokumen F ON A.id_dokumen = F.id_dokumen`).then((result)=>{
									console.log(result[0].length);
									if(result[0].length > 0){
										res.status(200).json({
											code: '01',
											message: 'Sukses',
											data: result[0]
										});
									}else{
										res.status(200).json({
											code: '02',
											message: 'Sukse',
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
	try{
		await db.query(`SELECT
							DISTINCT
								A.*,
								B.id_hscode,
								B.hd_code_format,
								B.id_takik,
								B.uraian_id,
								B.uraian_en,
								B.bm_mfn,
								B.no_skep,
								B.tanggal_skep,
								B.berlaku AS berlaku_hscode,
								b.fl_use,
								b.create_dt,
								C.ur_satuan,
								D.ur_incoterm,
								E.ur_valuta,
								F.kd_dokumen,
								F.nomor_dokumen,
								F.tgl_dokumen,
								F.filename_dokumen,
								F.id_permohonan,
								F.no_seri_dokumen,
								F.nib,
								G.ur_jenis_dokumen
						FROM
							masterlist.td_detail_masterlistbarang A
						LEFT JOIN
							refrensi.tr_hscode B ON A.kd_hs = B.kd_hs
						LEFT JOIN
							refrensi.tr_satuan C ON A.kd_satuan = C.kd_satuan
						LEFT JOIN
							refrensi.tr_incoterm D ON A.incoterm = D.incoterm
						LEFT JOIN
							refrensi.tr_valuta E ON A.kd_valuta = E.kd_valuta
						LEFT JOIN
							masterlist.td_dokumen F ON A.id_dokumen = F.id_dokumen
						LEFT JOIN
							refrensi.tr_jenis_dokumen G on F.kd_dokumen = F.kd_dokumen
						WHERE
							A.id_barang = :id_barang`,{
									replacements: {
										id_barang: req.params.id_barang
									}}).then((result)=>{
											if(result[0].length > 0){
												res.status(200).json({
													code: '01',
													message: 'Sukses',
													data: result[0]
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
										})
									});
	}catch(err){
		res.status(200).json({
			code: '02',
			message: err
		})
	}
}

controller.insert =  async function(req, res){
	try{
		const postData = req.body;
		const postDetailBarang = postData.detailBarang;
		const ObjectLength = Object.keys(postData).length;
		console.log(ObjectLength);
		await model.M_DetailBarang.create(postDetailBarang).then((result)=>{
			const data = result;
			if(ObjectLength == 2){
				const postBarangPelabuhan = postData.detailPelabuhan;
				for(var i=0; i<postBarangPelabuhan.length; i++){
						Object.assign(postBarangPelabuhan[i], {id_detailmasterlist_barang: result.id_detailmasterlist_barang});
				}
				model.M_DetailBarangPelabuhan.bulkCreate(postBarangPelabuhan).then((result)=>{
					res.status(200).json({
						code: '01',
						message: 'Sukses',
						data: data,
						data2: result
					});
				}).catch((err)=>{
					res.status(404).json({
						code: '02',
						message: err
					});
				});
			}else{
				console.log('berhasil');
				res.status(200).json({
					code: '01',
					message: 'Sukses',
					data: data
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
		const updateData = req.body;
		const updateDetailBarang = updateData.detailBarang;
		const updateBarangPelabuhan = updateData.detailPelabuhan;
		// console.log(updateBarangPelabuhan[0]);
		await model.M_DetailBarang.update(updateDetailBarang,{
			where: {
				id_detailmasterlist_barang: req.params.id_detailmasterlist_barang
			}
		}).then((result)=>{
				// res.status(200).json({
				// 	Mencoba: updateBarangPelabuhan.length
				// });
				console.log(updateBarangPelabuhan.length);
				if(updateBarangPelabuhan.length > 0){
					model.M_DetailBarangPelabuhan.update(updateBarangPelabuhan[0],{
						where:{
							id_detailbrg_pelabuhan: req.params.id_detailbrg_pelabuhan
						}
					}).then((ok)=>{
						res.status(200).json({
							code: '01',
							message: 'Sukses'
						});
					}).catch((err)=>{
						re.status(404).json({
							code: '02',
							message: 'Tidak Berhasil'
						})
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
			})
		}); 
	}catch(err){
		res.status(404).json({
			status: '02',
			message: err
		});
	}
}

controller.delete = async function(req, res){
	await db.query(`DELETE FROM 
							masterlist.td_detail_masterlistbarang
					WHERE
							id_detailmasterlist_barang = :id_detailmasterlist_barang`,{
								replacements: {
									id_detailmasterlist_barang: req.params.id_detailmasterlist_barang
								}
							}).then((result)=>{
								db.query(`DELETE FROM
												masterlist.td_detailbrg_pelabuhan
										  WHERE
										  		id_detailmasterlist_barang = :id_detailmasterlist_barang`,{
										  			replacements: {
										  				id_detailmasterlist_barang: req.params.id_detailmasterlist_barang
										  			}
										  		}).then((result)=>{
										  			res.status(200).json({
										  				code: '01',
										  				message: 'Sukses'
										  			});
										  		}).catch((err)=>{
										  			res.status(200).json({
										  				code: '02',
										  				message: err
										  			});
										  		});
							}).catch((err)=>{
								res.status(404).json({
									code: '02',
									message: err
								})
							});

}


module.exports = controller;