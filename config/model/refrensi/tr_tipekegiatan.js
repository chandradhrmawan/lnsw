const Sequelize = require('sequelize');
const db = require('../../database/database');

var tipekegiatan = db.define('tr_tipekegiatan',
	{
		kd_kegiatan: {type:Sequelize.BIGINT,primaryKey:true, autoIncreament: true},
		ur_kegiatan: Sequelize.STRING
	},{
		schema: 'refrensi',
		freezeTableName: true,
		timestamps: false
	}
);

module.exports = tipekegiatan;


