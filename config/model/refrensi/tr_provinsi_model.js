const Sequelize = require('sequelize');
const db = require('../../database/database');

var provinsi = db.define('tr_provinsi',
	{
		kd_provinsi: {type:Sequelize.STRING,primaryKey:true,},
		ur_provinsi: Sequelize.STRING
	},{
		schema: 'refrensi',
		freezeTableName: true,
		timestamps: false
	}
);

module.exports = provinsi;

