const Sequelize = require('sequelize');
const db = require('../../database/database');

var hscode = db.define('tr_listhscode_kek',
	{
		kd_listhscode_kek: {
			type: Sequelize.BIGINT,
			autoIncrement: true,
			primaryKey: true
		},
		kd_hs: {
			type: Sequelize.CHAR(45),
		},
		kode_lain: {
			type: Sequelize.CHAR(10),
		},
		kd_ga: {
			type: Sequelize.CHAR(2),
		},
		kd_perijinan: {
			type: Sequelize.CHAR(5),
		},
		tgl_awal_ijin: {
			type: Sequelize.DATE
		},
		kd_akhir_ijin: {
			type: Sequelize.CHAR
		},
		kd_fasilitas: {
			type: Sequelize.CHAR(6)
		},
		tgl_awal_fasilitas: {
			type: Sequelize.DATE,
		},
		tgl_akhir_fasilitas: {
			type: Sequelize.DATE
		},
	}, {
	schema: 'refrensi',
	freezeTableName: true,
	timestamps: false
}
);

hscode.removeAttribute('id');
module.exports = hscode;

