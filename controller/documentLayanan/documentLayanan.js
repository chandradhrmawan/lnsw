const model = require('../../config/model/index');
const {Op} = require('sequelize');
const controller = {};
const path = require('path');

controller.getAll = async function(req, res){
	await model.documentLayanan.findAll({
		  attributes: [['id_document', 'ID_DOKUMEN'],
						['id_seri', 'ID_SERI'],
						['kode_dokumen', 'KODE_DOKUMEN'],
						['Nomor_dokumen', 'NOMOR_DOKUMEN'],
						['Tanggal_dokumen', 'TANGGAL_DOKUMEN'],
						['File_Path', 'FILE_PATH'],
						['id_user', 'ID_USER'],
						['Tgl_upload', 'TANGGAL_UPLOAD']]
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
}

controller.getOne = async function(req, res){
	await model.documentLayanan.findAll({
		  attributes: [['id_document', 'ID_DOKUMEN'],
						['id_seri', 'ID_SERI'],
						['kode_dokumen', 'KODE_DOKUMEN'],
						['Nomor_dokumen', 'NOMOR_DOKUMEN'],
						['Tanggal_dokumen', 'TANGGAL_DOKUMEN'],
						['File_Path', 'FILE_PATH'],
						['id_user', 'ID_USER'],
						['Tgl_upload', 'TANGGAL_UPLOAD']],
		where: {
			id_document: req.params.id_dokumen
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
}

controller.insert = async function(req, res){
	const errInput = validationResult(req);
	const validasiFile = path.extname(req.file.filename);
		if(validasiFile == '.pdf' && errInput.isEmpty()){
			await model.documentLayanan.create({
				ID_pengajuan: req.body.id_pengajuan,
				id_seri: req.body.id_seri,
				kode_dokumen: req.body.kd_dokumen,
				Nomor_dokumen: req.body.nomor_dokumen,
				Tanggal_dokumen: req.body.tgl_dokumen,
				File_Path: req.file.path,
				id_user: req.body.id_user,
				Tgl_upload: Date.now()	
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
			if(!errInput.isEmpty()){
				res.status(404).json({
					code: '02',
					message: errInput.array()
				})
			}else{
				res.status(404).json({
					code: '02',
					message: 'File yang anda upload bukan berupa PDF'
				});
			}
		}
}

controller.update = async function(req, res){
	await model.documentLayanan.update({
		id_seri: req.body.id_seri,
		kode_dokumen: req.body.kd_dokumen,
		Nomor_dokumen: req.body.nomor_dokumen,
		Tanggal_dokumen: req.body.tgl_dokumen,
		File_Path: req.file.path,
		id_user: req.body.id_user,
		Tgl_upload: Date.now()	
	},{
		where: {
			id_document: req.params.id_dokumen
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
}

controller.delete = async function(req, res){
	await model.documentLayanan.destroy({
		where: {
			id_document: req.params.id_dokumen
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
}

module.exports = controller;