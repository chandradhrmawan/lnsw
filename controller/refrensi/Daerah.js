const model = require('../../config/model/index');
const { Op } = require('sequelize');
const controller = {};

controller.getAll = async function (req, res) {
	await model.daerah.findAll({
		attributes: [
			['daerah_kode', 'KodeDaerah'],
			['daerah_induk', 'IndukDaerah'],
			['daerah_nama', 'NamaDaerah'],
			['daerah_tipe', 'TipeDaerah']
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

controller.findDaerah = async function (req, res) {
	const search = req.params.search;
	await model.daerah.findAll({
		attributes: [
			['daerah_kode', 'KodeDaerah'],
			['daerah_induk', 'IndukDaerah'],
			['daerah_nama', 'NamaDaerah'],
			['daerah_tipe', 'TipeDaerah']
		],
		where: {
			[Op.or]: [{
				daerah_kode: {
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
		const tr_daerah = await model.daerah.create({
			kd_daerah: req.body.IdDaerah,
			daerah_kode: req.body.KodeDaerah,
			daerah_induk: req.body.IndukDaerah,
			daerah_nama: req.body.NamaDaerah,
			daerah_tipe: req.body.TipeDaerah
		});
		if (tr_daerah) {
			res.status(201).json({
				code: '01',
				message: 'Daerah berhasil ditambahkan',
				data: tr_daerah,
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
	await model.daerah.update({
		daerah_kode: req.body.KodeDaerah,
		daerah_induk: req.body.IndukDaerah,
		daerah_nama: req.body.NamaDaerah,
		daerah_tipe: req.body.TipeDaerah
	}, {
		where: {
			kd_daerah: req.params.IdDaerah
		}
	}).then(result => {
		res.status(200).json({
			code: '01',
			message: 'daerah berhasil Diubah',
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