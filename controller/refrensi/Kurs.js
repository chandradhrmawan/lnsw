const model = require('../../config/model/index');
const { Op } = require('sequelize');
const controller = {};
const path = require('path');
const moment = require('moment');
const {validationResult} = require('express-validator');
const db = require('../../config/database/database');

controller.getAll = async function (req, res) {
    let today = moment(Date.now()).utcOffset('+0700');
    let start_period = null;
    let end_period = null;
    const days = today.format('dddd')

    if(days == 'Wednesday') {
      start_period = today.clone().utcOffset('+0700').format('YYYY-MM-DD')
      end_period = today.clone().utc('+0700').add(6, 'days').format('YYYY-MM-DD')
    } else if(days == 'Tuesday') {
      start_period = today.clone().utcOffset('+0700').subtract(6, 'days').format('YYYY-MM-DD')
      end_period = today.clone().utcOffset('+0700').format('YYYY-MM-DD')
      // console.log('selasa')
    } else if(days == 'Thursday') {
      start_period = today.clone().utc('+0700').subtract(1, 'days').format('YYYY-MM-DD')
      end_period = today.clone().utc('+0700').add(5, 'days').format('YYYY-MM-DD')
    } else if(days == 'Friday') {
      start_period = today.clone().utc('+0700').subtract(2, 'days').format('YYYY-MM-DD')
      end_period = today.clone().utc('+0700').add(4, 'days').format('YYYY-MM-DD')
      // console.log('jumat')
    } else if(days == 'Sunday') {
      start_period = today.clone().utc('+0700').subtract(3, 'days').format('YYYY-MM-DD')
      end_period = today.clone().utc('+0700').add(2, 'days').format('YYYY-MM-DD')
      // console.log('minggu')
    } else {
      start_period = today.clone().utc('+0700').subtract(4, 'days').format('YYYY-MM-DD')
      end_period = today.clone().utc('+0700').add(1, 'days').format('YYYY-MM-DD')
      // console.log('senin')
    }

    await db.query(`SELECT "kd_kurs" AS "kdKurs", "tgawal" AS "tanggalAwal", "tgakhir" AS "tanggalAkhir", "nilai" AS "nilai", "ket" AS "keterangan", "create_dt" AS "create_date" FROM "refrensi"."tr_kurs" AS "tr_kurs" WHERE "tr_kurs"."tgawal" >= '`+start_period+`' AND "tr_kurs"."tgakhir" <= '`+end_period+`'`)
    .then((result)=>{
        // console.log(result[0].length);
        if(result[0].length > 0){
            res.status(200).json({
                code: '01',
                message: 'Sukses',
                data: result[0]
            });
        }else{
            res.status(200).json({
                code: '02',
                message: 'Sukses',
                data: 'Tidak ada Data'
            });
        }
    });
    // await model.kurs.findAll({
    //     attributes: [
    //         ['kd_kurs', 'kdKurs'],
    //         ['tgawal', 'tanggalAwal'],
    //         ['tgakhir', 'tanggalAkhir'],
    //         ['nilai', 'nilai'],
    //         ['ket', 'keterangan'],
    //         ['create_dt', 'create_date']
    //     ],
    //     where : {
    //         tgawal: {
    //             [Op.between]: [rabu, selasa]
    //         }
    //     }
    // })
    //     .then((result) => {
    //         if (result.length > 0) {
    //             res.status(200).json({
    //                 code: '01',
    //                 message: 'Sukses',
    //                 data: result
    //             });
    //         } else {
    //             res.status(404).json({
    //                 code: '01',
    //                 message: 'Tidak Ada Data'
    //             });
    //         }
    //     }).catch((err) => {
    //         res.status(400).json({
    //             code: '02',
    //             message: err
    //         });
    //     })
};

controller.get = async function (req, res) {
    const date = req.query.date;
    // const json = JSON.stringify(date);
    // const newdate = JSON.parse(json);
    // const date = "'2020-06-29 00:00:00.000 +00:00'";
    // console.log(json, newdate);

    try{
        await db.query(`SELECT "kd_kurs" AS "kdKurs", "tgawal" AS "tanggalAwal", "tgakhir" AS "tanggalAkhir", "nilai" AS "nilai", "ket" AS "keterangan", "create_dt" AS "create_date" FROM "refrensi"."tr_kurs" AS "tr_kurs" WHERE '`+date+`' BETWEEN "tr_kurs"."tgawal" AND "tr_kurs"."tgakhir"`)
        .then((result)=>{
            // console.log(result[0].length);
            if(result[0].length > 0){
                res.status(200).json({
                    code: '01',
                    message: 'Sukses',
                    data: result[0]
                });
            }else{
                res.status(200).json({
                    code: '02',
                    message: 'Sukses',
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

    // await model.kurs.findAll({
    //     attributes: [
    //         ['kd_kurs', 'kdKurs'],
    //         ['tgawal', 'tanggalAwal'],
    //         ['tgakhir', 'tanggalAkhir'],
    //         ['nilai', 'nilai'],
    //         ['ket', 'keterangan'],
    //         ['create_dt', 'create_date']
    //     ],
    //     where: {
    //         tgawal: {
    //             [Op.gte]: date,
    //         }
    //     }
    // })
    // .then((result) => {
    //     if (result.length > 0) {
    //         res.status(200).json({
    //             code: '01',
    //             message: 'Sukses',
    //             data: result
    //         });
    //     } else {
    //         res.status(404).json({
    //             code: '01',
    //             message: 'Tidak Ada Data'
    //         });
    //     }
    // }).catch((err) => {
    //     res.status(400).json({
    //         code: '02',
    //         message: err
    //     })
    // });
};

controller.post = async function (req, res) {
    const errInput = validationResult(req);
    if(errInput.isEmpty()){
        await model.kurs.create({
            kd_kurs: req.body.kd_kurs,
            tgawal: req.body.tgawal,
            tgakhir: req.body.nama_kota_kabupaten,
            nilai: req.body.nilai,
            ket: req.body.ket,
            create_dt: req.body.create_dt
        }).then((result) => {
            res.status(201).json({
                code: '01',
                message: 'Kurs berhasil ditambahkan',
                data: result
            })
        }).catch ((err) => {
            res.status(404).json({
                code: '02',
                message: err
            })
        });
    }else{
        res.status(404).json({
            code: '02',
            message: errInput
        });
    }
};

controller.update = async function(req, res){
    const errInput = validationResult(req);
	if(errInput.isEmpty()){
		await model.kurs.update({
            tgawal: req.body.tgawal,
            tgakhir: req.body.nama_kota_kabupaten,
            nilai: req.body.nilai,
            ket: req.body.ket,
            create_dt: req.body.create_dt
		},{
			where: {
				kd_kurs: req.params.kd_kurs
			}
		}).then(result => {
			res.status(200).json({
				code: '01',
				message: 'Kurs berhasil Diubah',
			})
		}).catch(err => {
			res.status(404).json({
				code: '02',
				message: err
			})
		});
	}else{
        res.status(404).json({
            code: '02',
            message: errInput
        });
    }
};

module.exports = controller;
