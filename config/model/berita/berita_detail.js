const Sequelize = require('sequelize');
const db = require('../../database/mysql');

var berita_detail = db.define('td_berita_detail',
	{
		id_detail: {type:Sequelize.INTEGER(11),primaryKey:true},
		id_berita: Sequelize.STRING(11),
		id_lang: Sequelize.STRING(2),
		berita_title: Sequelize.STRING(250),
		berita_header: Sequelize.TEXT,
		berita_content: Sequelize.TEXT
	},{
		freezeTableName: true,
		timestamps: false
	}
);

module.exports = berita_detail;


