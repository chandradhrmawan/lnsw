const model = require('../../config/model/index');
const { Op } = require('sequelize');
const controller = {};

controller.getAll = async function (req, res) {
	await model.list_hscode.findAll({
		attributes: [
			['kd_hs', 'KodeHs'],
			['kode_lain', 'KodeLain'],
			['kd_ga', 'KodeGa'],
			['kd_perijinan', 'KodePerijinan'],
			['tgl_awal_ijin', 'TanggalAwalIjin'],
			['kd_akhir_ijin', 'KodeAkhirIjin'],
			['kd_fasilitas', 'KodeFasilitas'],
			['tgl_awal_fasilitas', 'TanggalAwalFasilitas'],
			['tgl_akhir_fasilitas', 'TanggalAkhirFasilitas']
		]
	})
		.then((result) => {
			if (result.length > 0) {
				res.status(200).json({
					code: '01',
					message: 'Sukses',
					data: result
				});
			} else {
				res.status(200).json({
					code: '01',
					message: 'Tidak Ada Data'
				});
			}
		}).catch((err) => {
			res.status(404).json({
				code: '02',
				message: err
			});
		});
}

controller.findList = async function (req, res) {
	const search = req.params.search;
	await model.list_hscode.findAll({
		attributes: [
			['kd_hs', 'KodeHs'],
			['kode_lain', 'KodeLain'],
			['kd_ga', 'KodeGa'],
			['kd_perijinan', 'KodePerijinan'],
			['tgl_awal_ijin', 'TanggalAwalIjin'],
			['kd_akhir_ijin', 'KodeAkhirIjin'],
			['kd_fasilitas', 'KodeFasilitas'],
			['tgl_awal_fasilitas', 'TanggalAwalFasilitas'],
			['tgl_akhir_fasilitas', 'TanggalAkhirFasilitas']
		],
		where: {
			[Op.or]: [{
				kd_hs: {
					[Op.iLike]: '%' + search + '%'
				}
			}, {
				kd_perijinan: {
					[Op.iLike]: '%' + search + '%'
				}
			}]
		}
	}).then((result) => {
		if (result.length > 0) {
			res.status(200).json({
				code: '01',
				message: 'Sukses',
				data: result
			});
		} else {
			res.status(200).json({
				code: '01',
				message: 'Tidak Ada Data'
			});
		}
	}).catch((err) => {
		res.status(404).json({
			code: '02',
			message: err
		})
	});
}
controller.post = async function (req, res) {
	try {
		const tr_listHs = await model.list_hscode.create({
			kd_hs: req.body.KodeHs,
			kode_lain: req.body.KodeLain,
			kd_ga: req.body.KodeGa,
			kd_perijinan: req.body.KodePerijinan,
			tgl_awal_ijin: req.body.TanggalAwalIjin,
			kd_akhir_ijin: req.body.KodeAkhirIjin,
			kd_fasilitas: req.body.KodeFasilitas,
			tgl_awal_fasilitas: req.body.TanggalAwalFasilitas,
			tgl_akhir_fasilitas: req.body.TanggalAkhirFasilitas,
		});
		if (tr_listHs) {
			res.status(201).json({
				code: '01',
				message: 'List HsCode berhasil ditambahkan',
				data: tr_listHs,
			})
		}
	} catch (err) {
		res.status(400).json({
			code: '02',
			message: err,
			data: {},
		})
	}
};

controller.update = async function (req, res) {
	// const errInput = validationResult(req);
	// if (errInput.isEmpty()) {
	await model.list_hscode.update({
		kd_hs: req.body.KodeHs,
		kode_lain: req.body.KodeLain,
		kd_ga: req.body.KodeGa,
		kd_perijinan: req.body.KodePerijinan,
		tgl_awal_ijin: req.body.TanggalAwalIjin,
		kd_akhir_ijin: req.body.KodeAkhirIjin,
		kd_fasilitas: req.body.KodeFasilitas,
		tgl_awal_fasilitas: req.body.TanggalAwalFasilitas,
		tgl_akhir_fasilitas: req.body.TanggalAkhirFasilitas,
	}, {
		where: {
			kd_listhscode_kek: req.params.IdHsCodeKek
		}
	}).then(result => {
		res.status(200).json({
			code: '01',
			message: 'List HsCode berhasil Diubah',
		})
	}).catch(err => {
		res.status(400).json({
			code: '02',
			message: 'Error'
		})
	});
	// }
};
module.exports = controller;