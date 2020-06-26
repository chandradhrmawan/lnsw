const Sequelize = require('sequelize');
const db = require('../../database/database');

var status_perijinan = db.define('tr_status_perijinan',
	{
		kd_status_perijinan: {type:Sequelize.INTEGER,primaryKey:true,},
		ur_status_perijinan: Sequelize.STRING
	},{
		schema: 'refrensi',
		freezeTableName: true,
		timestamps: false
	}
);

module.exports = status_perijinan;

