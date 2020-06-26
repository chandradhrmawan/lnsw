const express = require('express');
const router = express.Router();
const controller = require('../../controller/autocomplete/provinsi');

// router.post('/', async function (req, res, next) {
// 	let queue = require("../../middlewares/amqp_lib");
// 	let message = {
// 		"sendTo": "aqmarinanas@gmail.com",
// 		"subject": "Testing subject1",
// 		"fullName": "Test user2",
// 		"jenis": "forgot"
// 	}
// 	let lastCode;
// 	await db.provinsi.findAll({
// 		attributes: ['kodeprovinsi'],
// 		limit: 1,
// 		order: [
// 			['kodeprovinsi', 'DESC']]
// 	})
// 		.then((result) => {
// 			if (result.length > 0) {
// 				const data = JSON.stringify(result);
// 				let pars = JSON.parse(data);
// 				lastCode = pars[0].kodeprovinsi;
// 			} else {
// 				res.status(204).json({
// 					code: '01',
// 					message: 'Tidak Ada Data'
// 				})
// 			}
// 		}).catch((err) => {
// 			res.status(404).json({
// 				code: '02',
// 				message: err
// 			});
// 		});

// 	const t = await db.define.transaction();

// 	const invoice = await invNum.next(lastCode);
// 	await db.provinsi.create({
// 		kodeprovinsi: invoice,
// 		namaprovinsi: req.body.nama
// 	}, { transaction: t }).then((result) => {
// 		t.commit();
// 		queue.publishExchange('lnsw.fanout.sendEmail', 'fanout', '', JSON.stringify(message));
// 		res.status(200).json({
// 			code: '01',
// 			message: 'Sukses',
// 			data: result
// 		});
// 	}).catch((err) => {
// 		t.rollback();
// 		res.status(404).json({
// 			code: '02',
// 			message: err
// 		})
// 	});
// });
router.get('/', controller.getAll);
router.get('/:search', controller.getOne);

module.exports = router;