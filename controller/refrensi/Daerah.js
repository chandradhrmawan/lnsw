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
controller.findbyNib = async function (req, res) {
	let search = req.query.perseroan;
	let result = [];
	let prov = search.substring(0, 2);
	let kota = search.substring(0, 4);
	let kec = search.substring(0, 7);
	let kel = search.substring(0, 10);
	console.log(prov, kota, kec, kel);
	try {
		const provinsi = await model.daerah.findAll({
			attributes: [
				['daerah_kode', 'KodeProvinsi'],
				['daerah_nama', 'NamaProvinsi'],
			],
			where: {
				daerah_kode: prov
			}
		});
		// result.push(JSON.parse(JSON.stringify(provinsi[0].dataValues)));
		// res.append()
		const kotaa = await model.daerah.findAll({
			attributes: [
				['daerah_kode', 'KodeKota'],
				['daerah_nama', 'NamaKota'],
			],
			where: {
				daerah_kode: kota
			}
		});
		const kecamatan = await model.daerah.findAll({
			attributes: [
				['daerah_kode', 'KodeKecamatan'],
				['daerah_nama', 'NamaKecamatan'],
			],
			where: {
				daerah_kode: kec
			}
		});
		const kelurahan = await model.daerah.findAll({
			attributes: [
				['daerah_kode', 'Kodekelurahan'],
				['daerah_nama', 'Namakelurahan'],
			],
			where: {
				daerah_kode: kel
			}
		});

		// console.log(provinsi[0].dataValues);
		res.status(200).json({
			code: '01',
			message: 'Sukses',
			dataProv: provinsi[0].dataValues,
			dataKota: kotaa[0].dataValues,
			dataKecamatan: kecamatan[0].dataValues,
			dataKelurahan: kelurahan[0].dataValues
		});
	}
	catch (error) {
		res.status(400).json({
			code: '02',
			message: error,
			data: {},
		})
	}
}
controller.findProvinsi = async function (req, res) {
	let search = req.query.perseroan;
	let prov = search.substring(0, 2);
	try {
		const provinsi = await model.daerah.findAll({
			attributes: [
				['daerah_kode', 'KodeProvinsi'],
				['daerah_nama', 'NamaProvinsi'],
			],
			where: {
				daerah_kode: prov
			}
		});
		res.status(200).json({
			code: '01',
			message: 'Sukses',
			dataProv: provinsi[0].dataValues,
		});
	}
	catch (error) {
		res.status(400).json({
			code: '02',
			message: error,
			data: {},
		})
	}
}
controller.findKota = async function (req, res) {
	let search = req.query.prov;
	try {
		const kota = await model.daerah.findAll({
			attributes: [
				['daerah_kode', 'KodeKota'],
				['daerah_nama', 'NamaKota'],
			],
			where: {
				daerah_induk: search
			}
		});
		res.status(200).json({
			code: '01',
			message: 'Sukses',
			dataProv: kota,
		});
	}
	catch (error) {
		res.status(400).json({
			code: '02',
			message: error,
			data: {},
		})
	}
}
controller.findKecamatan = async function (req, res) {
	let search = req.query.kota;
	try {
		const kecamatan = await model.daerah.findAll({
			attributes: [
				['daerah_kode', 'KodeKecamatan'],
				['daerah_nama', 'NamaKecamatan'],
			],
			where: {
				daerah_induk: search
			}
		});
		res.status(200).json({
			code: '01',
			message: 'Sukses',
			dataProv: kecamatan,
		});
	}
	catch (error) {
		res.status(400).json({
			code: '02',
			message: error,
			data: {},
		})
	}
}
controller.findKelurahan = async function (req, res) {
	let search = req.query.kec;
	try {
		const kelurahan = await model.daerah.findAll({
			attributes: [
				['daerah_kode', 'KodeKelurahan'],
				['daerah_nama', 'NamaKelurahan'],
			],
			where: {
				daerah_induk: search
			}
		});
		res.status(200).json({
			code: '01',
			message: 'Sukses',
			dataProv: kelurahan,
		});
	}
	catch (error) {
		res.status(400).json({
			code: '02',
			message: error,
			data: {},
		})
	}
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