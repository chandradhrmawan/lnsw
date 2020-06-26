const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { check, validationResult } = require('express-validator');

const valutaModel = require('../config/model/refrensi/tr_valuta_model');
const db = require('../config/database/database');

// TABLE SATUAN
router.get('/satuan', async function (req, res, next) {
    await db.tr_satuan.findAll({
        attributes: [['KD_SATUAN', 'kodeSatuan'], ['UR_SATUAN', 'urSatuan']]
    })
        .then((result) => {
            if (result.length > 0) {
                res.status(200).json({
                    code: '01',
                    message: 'Sukses',
                    data: result
                });
            } else {
                res.status(404).json({
                    code: '01',
                    message: 'Tidak Ada Data'
                });
            }
        }).catch((err) => {
            res.status(400).json({
                code: '02',
                message: err
            });
        })
});

router.get('/satuan/:search', async function (req, res, next) {
    const search = req.params.search;
    await db.tr_satuan.findAll({
        attributes: [['KD_SATUAN', 'kodeSatuan'], ['UR_SATUAN', 'urSatuan']],
        where: {
            [Op.or]: [{
                KD_SATUAN: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                UR_SATUAN: {
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
            res.status(404).json({
                code: '01',
                message: 'Tidak Ada Data'
            });
        }
    }).catch((err) => {
        res.status(400).json({
            code: '02',
            message: err
        })
    });
});

router.post('/satuan',[
	check('KD_SATUAN').isLength({ min:1 }),
	check('UR_SATUAN').isLength({ min:3 })
  	], async function (req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
	  		return res.status(422).json({ errors: errors.array() });
		}
	  	try {
		  	const tr_satuan = await db.tr_satuan.create({
			  	KD_SATUAN: req.body.KD_SATUAN,
			  	UR_SATUAN: req.body.UR_SATUAN
		  	});
		  	if (tr_satuan) {
			  	res.status(201).json({
					code: '01',
					message: 'Jenis Satuan berhasil ditambahkan',
					data: tr_satuan,
			  	})
		  	}
	  	} catch (err) {
		  	res.status(400).json({
				code: '02',
				message: err,
				data: {},
		  	})
	  	}
	}
);


// TABLE KOTA
router.get('/kota', async function (req, res, next) {
    await db.tr_kota.findAll({
        attributes: [
            ['ID_KOTA', 'idKota'],
            ['IBU_KOTA', 'ibuKota'],
            ['NAMA_KOTA_KABUPATEN', 'namaKabupaten'],
            ['KD_PROVINSI', 'kodeProvinsi']
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
                res.status(404).json({
                    code: '01',
                    message: 'Tidak Ada Data'
                });
            }
        }).catch((err) => {
            res.status(400).json({
                code: '02',
                message: err
            });
        })
});

router.get('/kota/:search', async function (req, res, next) {
    const search = req.params.search;
    await db.tr_kota.findAll({
        attributes: [
            ['ID_KOTA', 'idKota'],
            ['IBU_KOTA', 'ibuKota'],
            ['NAMA_KOTA_KABUPATEN', 'namaKabupaten'],
            ['KD_PROVINSI', 'kodeProvinsi']
        ],
        where: {
            [Op.or]: [{
                ID_KOTA: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                IBU_KOTA: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                NAMA_KOTA_KABUPATEN: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                KD_PROVINSI: {
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
            res.status(404).json({
                code: '01',
                message: 'Tidak Ada Data'
            });
        }
    }).catch((err) => {
        res.status(400).json({
            code: '02',
            message: err
        })
    });
});

router.post('/kota',[
	check('ID_KOTA').isLength({ min:3 }),
	check('IBU_KOTA').isLength({ min:5 }),
	check('NAMA_KOTA_KABUPATEN').isLength({ min:5 }),
	check('KD_PROVINSI').isLength({ min:4 })
  	], async function (req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
	  		return res.status(422).json({ errors: errors.array() });
		}
	  	try {
		  	const tr_kota = await db.tr_kota.create({
			  	ID_KOTA: req.body.ID_KOTA,
			  	IBU_KOTA: req.body.IBU_KOTA,
			  	NAMA_KOTA_KABUPATEN: req.body.NAMA_KOTA_KABUPATEN,
			  	KD_PROVINSI: req.body.KD_PROVINSI
		  	});
		  	if (tr_kota) {
			  	res.status(201).json({
					code: '01',
					message: 'Kota berhasil ditambahkan',
					data: tr_kota,
			  	})
		  	}
	  	} catch (err) {
		  	res.status(400).json({
				code: '02',
				message: err,
				data: {},
		  	})
	  	}
	}
);

// TABLE NEGARA
router.get('/negara', async function (req, res, next) {
    await db.tr_negara.findAll({
        attributes: [['KD_NEGARA', 'KodeNegara'], ['UR_NEGARA', 'Negara']]
    })
        .then((result) => {
            if (result.length > 0) {
                res.status(200).json({
                    code: '01',
                    message: 'Sukses',
                    data: result
                });
            } else {
                res.status(404).json({
                    code: '01',
                    message: 'Tidak Ada Data'
                });
            }
        }).catch((err) => {
            res.status(400).json({
                code: '02',
                message: err
            });
        })
});

router.get('/negara/:search', async function (req, res, next) {
    const search = req.params.search;
    await db.tr_negara.findAll({
        attributes: [['KD_NEGARA', 'KodeNegara'], ['UR_NEGARA', 'Negara']],
        where: {
            [Op.or]: [{
                KD_NEGARA: {
                    [Op.iLike]: '%'+ search + '%'
                }
            }, {
                UR_NEGARA: {
                    [Op.iLike]: '%'+ search + '%'
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
            res.status(404).json({
                code: '01',
                message: 'Tidak Ada Data'
            });
        }
    }).catch((err) => {
        // console.log(err);
        res.status(400).json({
            code: '02',
            message: err
        })
    });
});

router.post('/negara',[
	check('KD_NEGARA').isLength({ min:1 }),
	check('UR_NEGARA').isLength({ min:1 })
  	], async function (req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
	  		return res.status(422).json({ errors: errors.array() });
		}
	  	try {
		  	const tr_negara = await db.tr_negara.create({
			  	KD_NEGARA: req.body.KD_NEGARA,
			  	UR_NEGARA: req.body.UR_NEGARA
		  	});
		  	if (tr_negara) {
			  	res.status(201).json({
					code: '01',
					message: 'Negara berhasil ditambahkan',
					data: tr_negara,
			  	})
		  	}
	  	} catch (err) {
		  	res.status(400).json({
				code: '02',
				message: err,
				data: {},
		  	})
	  	}
	}
);

// TABLE PELABUHAN
router.get('/pelabuhan', async function (req, res, next) {
    await db.tr_pelabuhan.findAll({
        attributes: [['KD_PELABUHAN', 'KodePelabuhan'], ['UR_PELABUHAN', 'Pelabuhan']]
    })
        .then((result) => {
            if (result.length > 0) {
                res.status(200).json({
                    code: '01',
                    message: 'Sukses',
                    data: result
                });
            } else {
                res.status(404).json({
                    code: '01',
                    message: 'Tidak Ada Data'
                });
            }
        }).catch((err) => {
            res.status(400).json({
                code: '02',
                message: err
            });
        })
});

router.get('/pelabuhan/:search', async function (req, res, next) {
    const search = req.params.search;
    await db.tr_pelabuhan.findAll({
        attributes: [['KD_PELABUHAN', 'KodePelabuhan'], ['UR_PELABUHAN', 'Pelabuhan']],
        where: {
            [Op.or]: [{
                KD_PELABUHAN: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                UR_PELABUHAN: {
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
            res.status(404).json({
                code: '01',
                message: 'Tidak Ada Data'
            });
        }
    }).catch((err) => {
        // console.log(err);
        res.status(400).json({
            code: '02',
            message: err
        })
    });
});

router.post('/pelabuhan',[
	check('KD_PELABUHAN').isLength({ min:1 }),
	check('UR_PELABUHAN').isLength({ min:1 })
  	], async function (req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
	  		return res.status(422).json({ errors: errors.array() });
		}
	  	try {
		  	const tr_pelabuhan = await db.tr_pelabuhan.create({
			  	KD_PELABUHAN: req.body.KD_PELABUHAN,
			  	UR_PELABUHAN: req.body.UR_PELABUHAN
		  	});
		  	if (tr_pelabuhan) {
			  	res.status(201).json({
					code: '01',
					message: 'Pelabuhan berhasil ditambahkan',
					data: tr_pelabuhan,
			  	})
		  	}
	  	} catch (err) {
		  	res.status(400).json({
				code: '02',
				message: err,
				data: {},
		  	})
	  	}
	}
);

// TABLE PROVINSI
router.get('/provinsi', async function (req, res, next) {
    await db.tr_provinsi.findAll({
        attributes: [['KD_PROVINSI', 'kodeProvinsi'], ['UR_PROVINSI', 'Provinsi']]
    })
        .then((result) => {
            if (result.length > 0) {
                res.status(200).json({
                    code: '01',
                    message: 'Sukses',
                    data: result
                });
            } else {
                res.status(404).json({
                    code: '01',
                    message: 'Tidak Ada Data'
                })
            }
        }).catch((err) => {
            res.status(400).json({
                code: '02',
                message: err
            });
        })
});

router.get('/provinsi/:search', async function (req, res, next) {
    const search = req.params.search;
    await db.tr_provinsi.findAll({
        attributes: [['KD_PROVINSI', 'kodeProvinsi'], ['UR_PROVINSI', 'Provinsi']],
        where: {
            [Op.or]: [{
                KD_PROVINSI: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                UR_PROVINSI: {
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
            res.status(404).json({
                code: '01',
                message: 'Tidak Ada Data'
            });
        }
    }).catch((err) => {
        // console.log(err);
        res.status(400).json({
            code: '02',
            message: err
        })
    });
});

router.post('/provinsi',[
	check('KD_PROVINSI').isLength({ min:1 }),
	check('UR_PROVINSI').isLength({ min:1 })
  	], async function (req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
	  		return res.status(422).json({ errors: errors.array() });
		}
	  	try {
		  	const tr_provinsi = await db.tr_provinsi.create({
			  	KD_PROVINSI: req.body.KD_PROVINSI,
			  	UR_PROVINSI: req.body.UR_PROVINSI
		  	});
		  	if (tr_provinsi) {
			  	res.status(201).json({
					code: '01',
					message: 'Provinsi berhasil ditambahkan',
					data: tr_provinsi,
			  	})
		  	}
	  	} catch (err) {
		  	res.status(400).json({
				code: '02',
				message: err,
				data: {},
		  	})
	  	}
	}
);

//TABLE PERIJINAN
router.get('/perijinan', async function (req, res, next) {
    await db.tr_perijinan.findAll({
        attributes: [['KD_PERIJINAN', 'kodePerijinan'], ['UR_PERIJINAN', 'Perijinan'], ['KD_GA', 'kodeGA']]
    })
        .then((result) => {
            if (result.length > 0) {
                res.status(200).json({
                    code: '01',
                    message: 'Sukses',
                    data: result
                });
            } else {
                res.status(404).json({
                    code: '01',
                    message: 'Tidak Ada Data'
                })
            }
        }).catch((err) => {
            res.status(400).json({
                code: '02',
                message: err
            });
        })
});

router.get('/perijinan/:search', async function (req, res, next) {
    const search = req.params.search;
    await db.tr_perijinan.findAll({
        attributes: [['KD_PERIJINAN', 'kodePerijinan'], ['UR_PERIJINAN', 'Perijinan'], ['KD_GA', 'kodeGA']],
        where: {
            [Op.or]: [{
                KD_PERIJINAN: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                UR_PERIJINAN: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                KD_GA: {
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
            res.status(404).json({
                code: '01',
                message: 'Tidak Ada Data'
            });
        }
    }).catch((err) => {
        // console.log(err);
        res.status(400).json({
            code: '02',
            message: err
        })
    });
});

router.post('/perijinan',[
	check('KD_PERIJINAN').isLength({ min:1 }),
	check('UR_PERIJINAN').isLength({ min:1 }),
	check('KD_GA').isLength({ min:1 })
  	], async function (req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
	  		return res.status(422).json({ errors: errors.array() });
		}
	  	try {
		  	const tr_perijinan = await db.tr_perijinan.create({
			  	KD_PERIJINAN: req.body.KD_PERIJINAN,
			  	UR_PERIJINAN: req.body.UR_PERIJINAN,
			  	KD_GA: req.body.KD_GA
		  	});
		  	if (tr_perijinan) {
			  	res.status(201).json({
					code: '01',
					message: 'Perijinan berhasil ditambahkan',
					data: tr_perijinan,
			  	})
		  	}
	  	} catch (err) {
		  	res.status(400).json({
				code: '02',
				message: err,
				data: {},
		  	})
	  	}
	}
);

// TABLE STATUS PERIJINAN
router.get('/status_perijinan', async function (req, res, next) {
    await db.tr_status_perijinan.findAll({
        attributes: [['KD_STATUS_PERIJINAN', 'kodePerijinan'], ['UR_STATUS_PERIJINAN', 'Perijinan']]
    })
        .then((result) => {
            if (result.length > 0) {
                res.status(200).json({
                    code: '01',
                    message: 'Sukses',
                    data: result
                });
            } else {
                res.status(404).json({
                    code: '01',
                    message: 'Tidak Ada Data'
                })
            }
        }).catch((err) => {
            res.status(400).json({
                code: '02',
                message: err
            });
        })
});

router.get('/status_perijinan/:search', async function (req, res, next) {
    const search = req.params.search;
    await db.tr_status_perijinan.findAll({
        attributes: [['KD_STATUS_PERIJINAN', 'kodePerijinan'], ['UR_STATUS_PERIJINAN', 'Perijinan']],
        where: {
            [Op.or]: [{
                KD_STATUS_PERIJINAN: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                UR_STATUS_PERIJINAN: {
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
            res.status(404).json({
                code: '01',
                message: 'Tidak Ada Data'
            });
        }
    }).catch((err) => {
        // console.log(err);
        res.status(400).json({
            code: '02',
            message: err
        })
    });
});

router.post('/status_perijinan',[
	check('KD_STATUS_PERIJINAN').isLength({ min:1 }),
	check('UR_STATUS_PERIJINAN').isLength({ min:1 })
  	], async function (req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
	  		return res.status(422).json({ errors: errors.array() });
		}
	  	try {
		  	const tr_status_perijinan = await db.tr_status_perijinan.create({
			  	KD_STATUS_PERIJINAN: req.body.KD_STATUS_PERIJINAN,
			  	UR_STATUS_PERIJINAN: req.body.UR_STATUS_PERIJINAN
		  	});
		  	if (tr_status_perijinan) {
			  	res.status(201).json({
					code: '01',
					message: 'Status Perijinan berhasil ditambahkan',
					data: tr_status_perijinan,
			  	})
		  	}
	  	} catch (err) {
		  	res.status(400).json({
				code: '02',
				message: err,
				data: {},
		  	})
	  	}
	}
);

// TABLE GA
router.get('/ga', async function (req, res, next) {
    await db.tr_ga.findAll({
        attributes: [['KD_GA', 'kodeGA'], ['UR_GA', 'GA']]
    })
        .then((result) => {
            if (result.length > 0) {
                res.status(200).json({
                    code: '01',
                    message: 'Sukses',
                    data: result
                });
            } else {
                res.status(404).json({
                    code: '01',
                    message: 'Tidak Ada Data'
                })
            }
        }).catch((err) => {
            res.status(400).json({
                code: '02',
                message: err
            });
        })
});

router.get('/ga/:search', async function (req, res, next) {
    const search = req.params.search;
    await db.tr_ga.findAll({
        attributes: [['KD_GA', 'kodeGA'], ['UR_GA', 'GA']],
        where: {
            [Op.or]: [{
                KD_GA: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                UR_GA: {
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
            res.status(404).json({
                code: '01',
                message: 'Tidak Ada Data'
            });
        }
    }).catch((err) => {
        // console.log(err);
        res.status(400).json({
            code: '02',
            message: err
        })
    });
});

router.post('/ga',[
	check('KD_GA').isLength({ min:1 }),
	check('UR_GA').isLength({ min:1 })
  	], async function (req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
	  		return res.status(422).json({ errors: errors.array() });
		}
	  	try {
		  	const tr_ga = await db.tr_ga.create({
			  	KD_GA: req.body.KD_GA,
			  	UR_GA: req.body.UR_GA
		  	});
		  	if (tr_ga) {
			  	res.status(201).json({
					code: '01',
					message: 'GA berhasil ditambahkan',
					data: tr_ga,
			  	})
		  	}
	  	} catch (err) {
		  	res.status(400).json({
				code: '02',
				message: err,
				data: {},
		  	})
	  	}
	}
);

// TABLE HSCODE
router.get('/hscode', async function (req, res, next) {
    await db.tr_hscode.findAll({
        attributes: [['ID_HSCODE', 'idHscode'], 
                    ['KD_HS', 'kodeHs'], 
                    ['HD_CODE_FORMAT', 'codeFormat'], 
                    ['ID_TAKIK', 'idTakik'], 
                    ['URAIAN_ID', 'uraianID'], 
                    ['URAIAN_EN', 'uraianEN'], 
                    ['BM_MFN', 'bmMfn'], 
                    ['NO_SKEP', 'noSkep'], 
                    ['TANGGAL_SKEP', 'tanggalSkep'], 
                    ['BERLAKU', 'berlaku'], 
                    ['FL_USE', 'flUse'], 
                    ['create_dt', 'cretaeDt']]
    })
        .then((result) => {
            if (result.length > 0) {
                res.status(200).json({
                    code: '01',
                    message: 'Sukses',
                    data: result
                });
            } else {
                res.status(404).json({
                    code: '01',
                    message: 'Tidak Ada Data'
                })
            }
        }).catch((err) => {
            res.status(400).json({
                code: '02',
                message: err
            });
        })
});

router.get('/hscode/:search', async function (req, res, next) {
    const search = req.params.search;
    await db.tr_hscode.findAll({
        attributes: [['ID_HSCODE', 'idHscode'], 
                    ['KD_HS', 'kodeHs'], 
                    ['HD_CODE_FORMAT', 'codeFormat'], 
                    ['ID_TAKIK', 'idTakik'], 
                    ['URAIAN_ID', 'uraianID'], 
                    ['URAIAN_EN', 'uraianEN'], 
                    ['BM_MFN', 'bmMfn'], 
                    ['NO_SKEP', 'noSkep'], 
                    ['TANGGAL_SKEP', 'tanggalSkep'], 
                    ['BERLAKU', 'berlaku'], 
                    ['FL_USE', 'flUse'], 
                    ['create_dt', 'cretaeDt']],
        where: {
            [Op.or]: [{
                ID_HSCODE: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                KD_HS: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                HD_CODE_FORMAT: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                ID_TAKIK: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                URAIAN_ID: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                URAIAN_EN: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                BM_MFN: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                NO_SKEP: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                TANGGAL_SKEP: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                BERLAKU: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                FL_USE: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                create_dt: {
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
            res.status(404).json({
                code: '01',
                message: 'Tidak Ada Data'
            });
        }
    }).catch((err) => {
        // console.log(err);
        res.status(400).json({
            code: '02',
            message: err
        })
    });
});

router.post('/hscode',[
	check('KD_HS').isLength({ min:1 }),
	check('HD_CODE_FORMAT').isLength({ min:1 }),
	check('ID_TAKIK').isLength({ min:1 }),
	check('URAIAN_ID').isLength({ min:1 }),
	check('URAIAN_EN').isLength({ min:1 }),
	check('BM_MFN').isLength({ min:1 }),
	check('NO_SKEP').isLength({ min:1 }),
	check('TANGGAL_SKEP').isLength({ min:1 }),
	check('BERLAKU').isLength({ min:1 }),
	check('FL_USE').isLength({ min:1 }),
	check('create_dt').isLength({ min:1 })
  	], async function (req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
	  		return res.status(422).json({ errors: errors.array() });
		}
	  	try {
		  	const tr_hscode = await db.tr_hscode.create({
			  	KD_HS: req.body.KD_HS,
			  	HD_CODE_FORMAT: req.body.HD_CODE_FORMAT,
			  	ID_TAKIK: req.body.ID_TAKIK,
			  	URAIAN_ID: req.body.URAIAN_ID,
			  	URAIAN_EN: req.body.URAIAN_EN,
			  	BM_MFN: req.body.BM_MFN,
			  	NO_SKEP: req.body.NO_SKEP,
			  	TANGGAL_SKEP: req.body.TANGGAL_SKEP,
			  	BERLAKU: req.body.BERLAKU,
			  	FL_USE: req.body.FL_USE,
			  	create_dt: req.body.create_dt
		  	});
		  	if (tr_hscode) {
			  	res.status(201).json({
					code: '01',
					message: 'HSCODE berhasil ditambahkan',
					data: tr_hscode,
			  	})
		  	}
	  	} catch (err) {
		  	res.status(400).json({
				code: '02',
				message: err,
				data: {},
		  	})
	  	}
	}
);

// TABLE INCOTERM
router.get('/incoterm', async function (req, res, next) {
    await db.tr_incoterm.findAll({
        attributes: [['incoterm', 'Incoterm'], ['ur_incoterm', 'urIncoterm']]
    })
        .then((result) => {
            if (result.length > 0) {
                res.status(200).json({
                    code: '01',
                    message: 'Sukses',
                    data: result
                });
            } else {
                res.status(404).json({
                    code: '01',
                    message: 'Tidak Ada Data'
                })
            }
        }).catch((err) => {
            res.status(400).json({
                code: '02',
                message: err
            });
        })
});

router.get('/incoterm/:search', async function (req, res, next) {
    const search = req.params.search;
    await db.tr_incoterm.findAll({
        attributes: [['incoterm', 'Incoterm'], ['ur_incoterm', 'urIncoterm']],
        where: {
            [Op.or]: [{
                incoterm: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                ur_incoterm: {
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
            res.status(404).json({
                code: '01',
                message: 'Tidak Ada Data'
            });
        }
    }).catch((err) => {
        // console.log(err);
        res.status(400).json({
            code: '02',
            message: err
        })
    });
});

router.post('/incoterm',[
	check('incoterm').isLength({ min:1 }),
	check('ur_incoterm').isLength({ min:1 })
  	], async function (req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
	  		return res.status(422).json({ errors: errors.array() });
		}
	  	try {
		  	const tr_incoterm = await db.tr_incoterm.create({
			  	incoterm: req.body.incoterm,
			  	ur_incoterm: req.body.ur_incoterm
		  	});
		  	if (tr_incoterm) {
			  	res.status(201).json({
					code: '01',
					message: 'Incoterm berhasil ditambahkan',
					data: tr_incoterm,
			  	})
		  	}
	  	} catch (err) {
		  	res.status(400).json({
				code: '02',
				message: err,
				data: {},
		  	})
	  	}
	}
);

//TABLE JENIS DOKUMEN
router.get('/jenis_dokumen', async function (req, res, next) {
    await db.tr_jenis_dokumen.findAll({
        attributes: [['KD_DOKUMEN', 'kodeDokumen'], ['UR_JENIS_DOKUMEN', 'jenisDokumen']]
    })
        .then((result) => {
            if (result.length > 0) {
                res.status(200).json({
                    code: '01',
                    message: 'Sukses',
                    data: result
                });
            } else {
                res.status(404).json({
                    code: '01',
                    message: 'Tidak Ada Data'
                })
            }
        }).catch((err) => {
            res.status(400).json({
                code: '02',
                message: err
            });
        })
});

router.get('/jenis_dokumen/:search', async function (req, res, next) {
    const search = req.params.search;
    await db.tr_jenis_dokumen.findAll({
        attributes: [['KD_DOKUMEN', 'kodeDokumen'], ['UR_JENIS_DOKUMEN', 'jenisDokumen']],
        where: {
            [Op.or]: [{
                KD_DOKUMEN: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                UR_JENIS_DOKUMEN: {
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
            res.status(404).json({
                code: '01',
                message: 'Tidak Ada Data'
            });
        }
    }).catch((err) => {
        // console.log(err);
        res.status(400).json({
            code: '02',
            message: err
        })
    });
});

router.post('/jenis_dokumen',[
	check('KD_DOKUMEN').isLength({ min:1 }),
	check('UR_JENIS_DOKUMEN').isLength({ min:1 })
  	], async function (req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
	  		return res.status(422).json({ errors: errors.array() });
		}
	  	try {
		  	const tr_jenis_dokumen = await db.tr_jenis_dokumen.create({
			  	KD_DOKUMEN: req.body.KD_DOKUMEN,
			  	UR_JENIS_DOKUMEN: req.body.UR_JENIS_DOKUMEN
		  	});
		  	if (tr_jenis_dokumen) {
			  	res.status(201).json({
					code: '01',
					message: 'Jenis Dokumen berhasil ditambahkan',
					data: tr_jenis_dokumen,
			  	})
		  	}
	  	} catch (err) {
		  	res.status(400).json({
				code: '02',
				message: err,
				data: {},
		  	})
	  	}
	}
);

//TABLE JENIS PERMOHONAN
router.get('/jenis_permohonan', async function (req, res, next) {
    await db.tr_jenis_permohonan.findAll({
        attributes: [['kd_jenis_permohonan', 'kodeJenisPermohonan'], ['ur_permohonan', 'permohonan']]
    })
        .then((result) => {
            if (result.length > 0) {
                res.status(200).json({
                    code: '01',
                    message: 'Sukses',
                    data: result
                });
            } else {
                res.status(404).json({
                    code: '01',
                    message: 'Tidak Ada Data'
                })
            }
        }).catch((err) => {
            res.status(400).json({
                code: '02',
                message: err
            });
        })
});

router.get('/jenis_permohonan/:search', async function (req, res, next) {
    const search = req.params.search;
    await db.tr_jenis_permohonan.findAll({
        attributes: [['kd_jenis_permohonan', 'kodeJenisPermohonan'], ['ur_permohonan', 'permohonan']],
        where: {
            ur_permohonan: {
                [Op.iLike]: '%' + search + '%'
            }
        }
    }).then((result) => {
        if (result.length > 0) {
            res.status(200).json({
                code: '01',
                message: 'Sukses',
                data: result
            });
        } else {
            res.status(404).json({
                code: '01',
                message: 'Tidak Ada Data'
            });
        }
    }).catch((err) => {
        // console.log(err);
        res.status(400).json({
            code: '02',
            message: err
        })
    });
});

router.post('/jenis_permohonan',[
	check('kd_jenis_permohonan').isLength({ min:1 }),
	check('ur_permohonan').isLength({ min:1 })
  	], async function (req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
	  		return res.status(422).json({ errors: errors.array() });
		}
	  	try {
		  	const tr_jenis_permohonan = await db.tr_jenis_permohonan.create({
			  	kd_jenis_permohonan: req.body.kd_jenis_permohonan,
			  	ur_permohonan: req.body.ur_permohonan
		  	});
		  	if (tr_jenis_permohonan) {
			  	res.status(201).json({
					code: '01',
					message: 'Jenis Permohonan berhasil ditambahkan',
					data: tr_jenis_permohonan,
			  	})
		  	}
	  	} catch (err) {
		  	res.status(400).json({
				code: '02',
				message: err,
				data: {},
		  	})
	  	}
	}
);

//TABLE VALUTA
router.get('/valuta', async function (req, res, next) {
    await db.tr_valuta.findAll({
        attributes: [['KD_VALUTA', 'kodeValuta'], ['UR_VALUTA', 'urValuta']]
    })
        .then((result) => {
            if (result.length > 0) {
                res.status(200).json({
                    code: '01',
                    message: 'Sukses',
                    data: result
                });
            } else {
                res.status(404).json({
                    code: '01',
                    message: 'Tidak Ada Data'
                })
            }
        }).catch((err) => {
            res.status(400).json({
                code: '02',
                message: err
            });
        })
});

router.get('/valuta/:search', async function (req, res, next) {
    const search = req.params.search;
    await db.tr_valuta.findAll({
        attributes: [['KD_VALUTA', 'kodeValuta'], ['UR_VALUTA', 'urValuta']],
        where: {
            [Op.or]: [{
                KD_VALUTA: {
                    [Op.iLike]: '%' + search + '%'
                }
            }, {
                UR_VALUTA: {
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
            res.status(404).json({
                code: '01',
                message: 'Tidak Ada Data'
            });
        }
    }).catch((err) => {
        // console.log(err);
        res.status(400).json({
            code: '02',
            message: err
        })
    });
});

router.post('/valuta',[
	check('KD_VALUTA').isLength({ min:1 }),
	check('UR_VALUTA').isLength({ min:1 })
  	], async function (req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
	  		return res.status(422).json({ errors: errors.array() });
		}
	  	try {
		  	const tr_valuta = await db.tr_valuta.create({
			  	KD_VALUTA: req.body.KD_VALUTA,
			  	UR_VALUTA: req.body.UR_VALUTA
		  	});
		  	if (tr_valuta) {
			  	res.status(201).json({
					code: '01',
					message: 'Valuta berhasil ditambahkan',
					data: tr_valuta,
			  	})
		  	}
	  	} catch (err) {
		  	res.status(400).json({
				code: '02',
				message: err,
				data: {},
		  	})
	  	}
	}
);

module.exports = router;