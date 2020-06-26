const Sequelize = require('sequelize');
const db = require('../../database/database');

var tr_kek = db.define('tr_kek',
	{
		kd_kek: {type:Sequelize.INTEGER,primaryKey: true},
		ur_kek: Sequelize.STRING,
		kd_kota: Sequelize.INTEGER,
	},{
		schema: 'refrensi',
		freezeTableName: true,
		timestamps: false
	}
);

module.exports = tr_kek;