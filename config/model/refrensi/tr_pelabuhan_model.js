const Sequelize = require('sequelize');
const db = require('../../database/database');

var pelabuhan = db.define('tr_pelabuhan',
	{
		kd_pelabuhan: {type:Sequelize.STRING,primaryKey:true,},
		ur_pelabuhan: Sequelize.STRING
	},{
		schema: 'refrensi',
		freezeTableName: true,
		timestamps: false
	}
);

module.exports = pelabuhan;