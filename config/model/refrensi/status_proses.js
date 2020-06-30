const Sequelize = require('sequelize');
const db = require('../../database/database');

var tr_status_proses = db.define('tr_status_proses',
	{
		kode_proses: {type:Sequelize.INTEGER,primaryKey:true,},
		ur_proses: Sequelize.STRING
	},{
		schema: 'refrensi',
		freezeTableName: true,
		timestamps: false
	}
);

module.exports = tr_status_proses;

