const Sequelize = require('sequelize');
const db = require('../../database/mysql');

var berita_category = db.define('td_berita_category',
	{
		id_category: {type:Sequelize.SMALLINT(6),primaryKey:true},
		nm_category: Sequelize.STRING(25),
		disp_category: Sequelize.STRING(100),
		category_note: Sequelize.STRING(250),
		fl_share: Sequelize.STRING
	},{
		freezeTableName: true,
		timestamps: false
	}
);

module.exports = berita_category;


