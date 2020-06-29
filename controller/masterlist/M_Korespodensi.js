const model = require('../../config/model/index');
const controller = {};
const path = require('path');
const db = require('../../config/database/database');
const { validationResult } = require('express-validator');

controller.getAll = async function (req, res) {
	try {
		await model.M_Korespodensi.findAll()
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
						message: 'Sukses',
						data: 'Tidak ada data'
					});
				}
			}).catch((err) => {
				res.status(404).json({
					code: '02',
					message: err
				});
			});
	} catch (err) {
		res.status(404).json({
			code: '02',
			message: err
		})
	}
}
controller.getOne = async function (req, res) {
	try {
		const errInput = validationResult(req);
		if (errInput.isEmpty()) {
			await model.M_Korespodensi.findAll({
				where: {
					id_korespodensi: req.params.id_korespodensi
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
				});
			});
		} else {
			res.status(404).json({
				code: '02',
				message: errInput
			});
		}
	} catch (err) {
		res.status(404).json({
			code: '02',
			message: err
		});
	}
}
controller.getFind = async function (req, res) {
	let search = req.query.nib;
	try {
		let koresponden = await model.v_korespodensi.findAll({
			where: {
				nib: search
			},
		});
		res.status(200).json({
			code: '01',
			message: 'Sukses',
			data: koresponden
		});
	} catch (err) {
		res.status(404).json({
			code: '02',
			message: err
		});
	}
}

controller.insert = async function (req, res) {
	const t = await db.transaction();
	try {
		const errInput = validationResult(req);
		if (errInput.isEmpty()) {
			await model.M_Korespodensi.create({
				id_permohonan: req.body.id_permohonan,
				tipe_korespodensi: req.body.tipe_korespodensi,
				nama_korespodensi: req.body.nama_korespodensi,
				jbt_korespodensi: req.body.jbt_korespodensi,
				alamat_korespodensi: req.body.alamat_korespodensi,
				jenis_identitas: req.body.jenis_identitas,
				nomor_identias: req.body.nomor_identias,
				no_telepon: req.body.no_telepon,
				np_hp: req.body.np_hp,
				email: req.body.email,
			}, {
				transaction: t
			}).then((result) => {
				t.commit();
				res.status(200).json({
					code: '01',
					message: 'Sukes'
				})
			}).catch((err) => {
				t.rollback();
				res.status(404).json({
					code: '02',
					message: err
				});
			});
		} else {
			res.status(404).json({
				code: '02',
				message: errInput
			});
		}
	} catch (err) {
		res.status(404).json({
			code: '02',
			message: err
		});
	}
}

controller.update = async function (req, res) {
	const t = await db.transaction();
	try {
		const errInput = validationResult(req);
		if (errInput.isEmpty()) {
			await model.M_Korespodensi.update({
				id_permohonan: req.body.id_permohonan,
				tipe_korespodensi: req.body.tipe_korespodensi,
				nama_korespodensi: req.body.nama_korespodensi,
				jbt_korespodensi: req.body.jbt_korespodensi,
				alamat_korespodensi: req.body.alamat_korespodensi,
				jenis_identitas: req.body.jenis_identitas,
				nomor_identias: req.body.nomor_identias,
				no_telepon: req.body.no_telepon,
				np_hp: req.body.np_hp,
				email: req.body.email,
			}, {
				where: {
					id_korespodensi: req.params.id_korespodensi
				}
			}, {
				transaction: t
			}).then((result) => {
				t.commit();
				res.status(200).json({
					code: '01',
					message: 'Sukes'
				})
			}).catch((err) => {
				t.rollback();
				res.status(404).json({
					code: '02',
					message: err
				});
			});
		} else {
			res.status(404).json({
				code: '02',
				message: errInput
			});
		}
	} catch (err) {
		res.status(404).json({
			code: '02',
			message: err
		});
	}
}
controller.delete = async function (req, res) {
	const t = await db.transaction();
	try {
		const errInput = validationResult(req);
		if (errInput.isEmpty()) {
			await model.M_Korespodensi.destroy({
				where: {
					id_korespodensi: req.params.id_korespodensi
				}
			}, {
				transaction: t
			}).then((result) => {
				t.commit();
				res.status(200).json({
					code: '01',
					message: 'Sukes'
				})
			}).catch((err) => {
				t.rollback();
				res.status(404).json({
					code: '02',
					message: err
				});
			});
		} else {
			res.status(404).json({
				code: '02',
				message: errInput
			});
		}
	} catch (err) {
		res.status(404).json({
			code: '02',
			message: err
		});
	}
}

module.exports = controller;