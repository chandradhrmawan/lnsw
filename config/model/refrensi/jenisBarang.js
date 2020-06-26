const Sequelize = require('sequelize');
const db = require('../../database/database');

var tr_jenis_barang = db.define('tr_jenis_barang',
	{
		kd_jenis_barang : {
			type 			: Sequelize.INTEGER,
			primaryKey 		: true,
			autoIncrement 	: true
		},
		ur_jenis_barang		: Sequelize.STRING
	},{
		schema: 'refrensi',
		freezeTableName: true,
		timestamps: false
	}
);

module.exports = tr_jenis_barang;