const Sequelize = require('sequelize');
const db = require('../../database/mysql');

var berita_file = db.define('td_berita_file',
	{
		id: {type:Sequelize.INTEGER(11),primaryKey:true},
		id_berita: Sequelize.INTEGER(11),
		id_file: Sequelize.INTEGER(11)
	},{
		freezeTableName: true,
		timestamps: false
	}
);

module.exports = berita_file;


