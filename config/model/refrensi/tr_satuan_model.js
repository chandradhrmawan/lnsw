const Sequelize = require('sequelize');
const db = require('../../database/database');

var satuan = db.define('tr_satuan',
	{
		kd_satuan: {type:Sequelize.STRING,primaryKey:true,},
		ur_satuan: Sequelize.STRING
	},{
		schema: 'refrensi',
		freezeTableName: true,
		timestamps: false
	}
);

module.exports = satuan;

