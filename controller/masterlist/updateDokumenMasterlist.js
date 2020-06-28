const controller = {};
const path = require('path');
const model = require('../../config/model/index');
const db = require('../../config/database/database');
const fs = require('fs');

controller.update = async function(req, res){
	let t = await db.transaction();
	const extValidation = path.extname(req.file.originalname);
	if(extValidation == '.pdf' || extValidation == '.xlsx'){
		await model.dokumen.create({
			kd_dokumen: req.body.kd_dokumen,
			nomor_dokumen: req.body.nomor_dokumen,
			tgl_dokumen: Date.now(),
			id_permohonan: req.body.id_permohonan,
			no_seri_dokumen: req.body.no_seri_dokumen,
			nib: req.body.nib,
			filename_dokumen: req.file.path
		},{
			transaction: t
		}).then(async(result)=>{
			console.log(result);
				await model.M_DetailBarang.update({
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
							message: result
						});
				}).catch((err)=>{
						t.rollback();
						fs.unlinkSync(req.file.path);
						res.status(404).json({
							code: '02',
							message: err
					});
				});
		});
	}else{
		res.status(404).json({
			code: '02',
			message: 'Anda hanya boleh upload dokumen PDF ataupun XLSX'
		});
	}
}

module.exports = controller;