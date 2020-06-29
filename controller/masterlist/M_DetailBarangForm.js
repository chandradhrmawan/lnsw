const model = require('../../config/model/index');
const controller = {};
const path = require('path');
const {validationResult} = require('express-validator');
const db = require('../../config/database/database');
const {Op} = require('sequelize');
const fs = require('fs');

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
								F.no_seri_dokumen,
								H.ur_jenis_dokumen,
								G.id_permohonan,
								G.nib,
								I.id_permohonan
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
								masterlist.td_hdr_masterlistbarang G ON A.id_barang = G.id_barang
						LEFT JOIN
								refrensi.tr_jenis_dokumen H on F.kd_dokumen = H.kd_dokumen
						LEFT JOIN
								masterlist.td_hdr_masterlistbarang I ON A.id_barang = I.id_barang
						ORDER BY
								A.id_detailmasterlist_barang ASC`).then((result)=>{
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
								G.ur_jenis_dokumen,
								H.id_permohonan
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
							refrensi.tr_jenis_dokumen G on F.kd_dokumen = G.kd_dokumen
						LEFT JOIN
							masterlist.td_hdr_masterlistbarang H ON A.id_barang = H.id_barang
						WHERE
							H.id_permohonan = :id_permohonan
						AND
							A.id_barang = :id_barang`,{
									replacements: {
										id_permohonan: req.params.id_permohonan,
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
													message: 'Tidak ada data',
													data: []
												});
											}
									}).catch((err)=>{
										res.status(404).json({
											code: '02',
											message: 'Tidak dapat menampilkan data',
											data: []
										})
									});
	}catch(err){
		res.status(200).json({
			code: '02',
			message: 'Terjadi Kesalahan',
			data: []
		})
	}
}

controller.insert =  async function(req, res){
	const t = await db.transaction();
	try{
		const errorValidation = validationResult(req);
		if(errorValidation.isEmpty()){
			const postData = req.body;
			const postDetailBarang = postData.detailBarang;
			const ObjectLength = Object.keys(postData).length;
			console.log(ObjectLength);
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
		}).then((result)=>{
				if(ObjectLength == 2){
					var berhasil = 0;
					const updateBarangPelabuhan = updateData.detailPelabuhan;
					for(var i=0 ; i<updateBarangPelabuhan.length; i++){
						const validasi = model.M_DetailBarangPelabuhan.update(updateBarangPelabuhan[i],{
							where:{
								[Op.and]: [
									{id_detailmasterlist_barang: req.params.id_detailmasterlist_barang},
									{id_detailbrg_pelabuhan: updateBarangPelabuhan[i].id_detailbrg_pelabuhan}]
							}
						},{
							trasaction: t
						});

						if(validasi){
							berhasil++;
						}
					}
					if(berhasil == updateBarangPelabuhan.length){
						t.commit();
						res.status(200).json({
							code: '01',
							message: 'Sukses'
						});
					}else{
						t.rollback();
						res.status(404).json({
							code: '02',
							message: 'Tidak Berhasil Merubah Data',
							data: []
						});
					}
				}else{
					t.commit();
					res.status(200).json({
						code: '01',
						message: 'Sukses'
					});
				}
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


module.exports = controller;