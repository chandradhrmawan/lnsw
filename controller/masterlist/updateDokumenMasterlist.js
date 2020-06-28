const controller = {};
const db = require('../../config/database/database');
const model = require('../../config/model/index');
const fs = require('fs');

controller.update = async function(req,res){
	const t = await db.transaction();
	const path = 'assets/upload/MasterlistBarang';
	const filename = req.files.file;
	const filename_dokumen = path+'/'+Date.now()+'_'+filename.name;

	await model.dokumen.create({
		kd_dokumen: req.body.kd_dokumen,
		nomor_dokumen: req.body.nomor_dokumen,
		tgl_dokumen: Date.now(),
		id_permohonan: req.body.id_permohonan,
		no_seri_dokumen: req.body.no_seri_dokumen,
		nib: req.body.nib,
		filename_dokumen: filename_dokumen
	},{
		transaction: t
	}).then((result)=>{
		console.log(result.dataValues);
		filename.mv('./'+filename_dokumen, function(err){
			if(err){
				res.status(404).json({
					message: err
				})
			}else{
				model.M_DetailBarang.update({
					id_dokumen: result.dataValues.id_dokumen
				},{
					where: {
						id_detailmasterlist_barang: req.body.id_detailmasterlist_barang
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
					res.status(404).json({
						code: '02',
						message: err
					});
				});
			}
		});
	});

}

module.exports = controller;