const Sequelize = require('sequelize');
const db = require('../../database/database');

var perijinan = db.define('tr_perijinan',
	{
		kd_perijinan: {type:Sequelize.STRING,primaryKey:true,},
		ur_perijinan: Sequelize.STRING,
		kd_ga: Sequelize.STRING
	},{
		schema: 'refrensi',
		freezeTableName: true,
		timestamps: false
	}
);

module.exports = perijinan;

