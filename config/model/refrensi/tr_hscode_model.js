const Sequelize = require('sequelize');
const db = require('../../database/database');

var hscode = db.define('tr_hscode',
	{
		id_hscode: {type:Sequelize.INTEGER,primaryKey:true,},
		kd_hs: Sequelize.STRING,
		hd_code_format: Sequelize.STRING,
		id_takik: Sequelize.STRING,
		uraian_id: Sequelize.STRING,
		uraian_en: Sequelize.STRING,
		bm_mfn: Sequelize.STRING,
		no_skep: Sequelize.STRING,
		tanggal_skep: Sequelize.STRING,
		berlaku: Sequelize.STRING,
		fl_use: Sequelize.STRING,
		create_dt: Sequelize.DATE
	},{
		schema: 'refrensi',
		freezeTableName: true,
		timestamps: false
	}
);

module.exports = hscode;

