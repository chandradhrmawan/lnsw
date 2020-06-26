const Sequelize = require('sequelize');
const db = require('../../database/database');

var ga = db.define('tr_ga',
	{
		kd_ga: {type:Sequelize.STRING,primaryKey:true},
		ur_ga: Sequelize.STRING
	},{
		schema: 'refrensi',
		freezeTableName: true,
		timestamps: false
	}
);

module.exports = ga;


