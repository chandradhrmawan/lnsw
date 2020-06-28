const Sequelize = require('sequelize');
const db = require('../../database/database');

var tr_layanan = db.define('tr_layanan',
	{
		kd_layanan : {
			type 			: Sequelize.INTEGER,
			primaryKey 		: true,
			autoIncrement 	: true
		},
		nama_layanan		: Sequelize.STRING,
		path_upload		 	: Sequelize.STRING,
	},{
		schema: 'refrensi',
		freezeTableName: true,
		timestamps: false
	}
);

module.exports = tr_layanan;