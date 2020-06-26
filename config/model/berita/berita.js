const Sequelize = require('sequelize');
const db = require('../../database/mysql');
const berita_category = require('./berita_category');
const berita_file = require('./berita_file');
const berita_detail = require('./berita_detail');

var berita = db.define('td_berita',
	{
		id_berita: {type:Sequelize.INTEGER,primaryKey:true},
		berita_category: Sequelize.STRING(2),
		rekam_by: Sequelize.STRING(25),
		ga_rekam: Sequelize.STRING(2),
		wk_rekam: Sequelize.DATE,
		fl_aktif: Sequelize.STRING,
		read_count: Sequelize.SMALLINT(6),
		comment_count: Sequelize.SMALLINT(6)
	},{
		freezeTableName: true,
		timestamps: false
	}
);

berita.hasOne(berita_file, { foreignKey: 'id_berita', as:'file' });
berita.hasOne(berita_detail, { foreignKey: 'id_berita', as:'detail' });
// berita_category.hasMany(berita, { foreignKey: 'berita_category', as:'berita'});
// berita_category.belongsTo(berita, { foreignKey: 'id_category'});

module.exports = berita;


