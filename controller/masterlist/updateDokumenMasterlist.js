const controller = {};
const db = require('../../config/database/database');
const model = require('../../config/model/index');
const path = require('path');
const fs = require('fs');
const helper = require('../../helpers/global_helper');

controller.update = async function(req,res){
	const t = await db.transaction();
	const path_alamat = 'assets/upload/MasterlistBarang';
	const id_permohonan = req.body.id_permohonan;
	const file_upload = req.files.file;
	const params = {
		id_permohonan: id_permohonan,
		file_upload: file_upload
	}
	// const filename_dokumen = path_alamat+'/'+Date.now()+'_'+filename.name;
	
	const validationExt = path.extname(file_upload.name);
	if(validationExt == '.pdf' || validationExt == '.xlsx'){
		const get = await helper.uploadData(params);
		const getPath = get.path.substring(2);
		console.log(getPath);
		await model.dokumen.create({
			kd_dokumen: req.body.kd_dokumen,
			nomor_dokumen: req.body.nomor_dokumen,
			tgl_dokumen: Date.now(),
			id_permohonan: id_permohonan,
			no_seri_dokumen: req.body.no_seri_dokumen,
			nib: req.body.nib,
			filename_dokumen: getPath
		},{
			transaction: t
		}).then((result)=>{
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
							message: 'Tidak dapat update data',
							data: []
						});
					});
		});
	}else{
		res.status(404).json({
			code: '02',
			message: 'Tidak dapat upload file selain PDF ataupun XLSX',
			data: []
		});
	}

}

module.exports = controller;