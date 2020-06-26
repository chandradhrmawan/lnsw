const Sequelize = require('sequelize');
const db = require('../../database/database');

var kurs = db.define('tr_kurs',
	{
		kd_kurs: {type:Sequelize.CHAR(3),primaryKey: true},
		tgawal: Sequelize.DATE,
		tgakhir: Sequelize.DATE,
		nilai: Sequelize.STRING,
		ket: Sequelize.CHAR(30),
		create_dt: Sequelize.DATE
	},{
		schema: 'refrensi',
		freezeTableName: true,
		timestamps: false
	}
);

module.exports = kurs;