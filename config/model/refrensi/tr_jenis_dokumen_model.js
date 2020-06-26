const Sequelize = require('sequelize');
const db = require('../../database/database');

var jenis_dokumen = db.define('tr_jenis_dokumen',
	{
		kd_dokumen: {type:Sequelize.STRING,primaryKey:true,},
		ur_jenis_dokumen: Sequelize.STRING
	},{
		schema: 'refrensi',
		freezeTableName: true,
		timestamps: false
	}
);

module.exports = jenis_dokumen;

