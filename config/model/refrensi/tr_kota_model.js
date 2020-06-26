const Sequelize = require('sequelize');
const db = require('../../database/database');

var kota = db.define('tr_kota',
	{
		kd_kota: {type:Sequelize.INTEGER,primaryKey: true,autoIncrement: true},
		id_kota: Sequelize.STRING,
		ibu_kota: Sequelize.STRING,
		nama_kota_kabupaten: Sequelize.STRING,
		kd_provinsi: Sequelize.STRING
	},{
		schema: 'refrensi',
		freezeTableName: true,
		timestamps: false
	}
);

module.exports = kota;