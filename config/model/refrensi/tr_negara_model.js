const Sequelize = require('sequelize');
const db = require('../../database/database');

var negara = db.define('tr_negara',
	{
		kd_negara: {type:Sequelize.STRING,primaryKey:true,},
		ur_negara: Sequelize.STRING
	},{
		schema: 'refrensi',
		freezeTableName: true,
		timestamps: false
	}
);

module.exports = negara;

