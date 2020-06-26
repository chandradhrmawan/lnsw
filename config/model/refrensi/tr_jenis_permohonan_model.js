const Sequelize = require('sequelize');
const db = require('../../database/database');

var jenis_permohonan = db.define('tr_jenis_permohonan',
	{
		kd_jenis_permohonan: {type:Sequelize.STRING,primaryKey:true,},
		ur_permohonan: Sequelize.STRING
	},{
		schema: 'refrensi',
		freezeTableName: true,
		timestamps: false
	}
);

module.exports = jenis_permohonan;


