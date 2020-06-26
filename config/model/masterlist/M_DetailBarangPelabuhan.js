const Sequelize = require('sequelize');
const db = require('../../database/database');

const detailBarangPelabuhan = db.define('td_detailbrg_pelabuhan', {
	id_detailbrg_pelabuhan: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	id_detailmasterlist_barang: {
		type: Sequelize.BIGINT
	},
	kd_negara: {
		type: Sequelize.CHAR(2)
	},
	kd_pelabuhan: {
		type: Sequelize.CHAR(5)
	},
	type: {
		type: Sequelize.CHAR(200)
	}
}, {
	schema: 'masterlist',
	freezeTableName: true,
	timestamps: false
});

detailBarangPelabuhan.removeAttribute('id');
module.exports = detailBarangPelabuhan;