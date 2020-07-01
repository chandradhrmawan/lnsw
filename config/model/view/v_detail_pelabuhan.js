const Sequelize = require('sequelize');
const db = require('../../database/database');

const v_detail_pelabuhan = db.define('v_detail_pelabuhan', {
	id_detailbrg_pelabuhan: Sequelize.INTEGER,
	id_detailmasterlist_barang: Sequelize.BIGINT,
	data_negara: Sequelize.TEXT,
	data_pelabuhan: Sequelize.TEXT,
	type: Sequelize.STRING
},{
	schema: 'masterlist',
	freezeTableName: true,
	timestamps: false
});

v_detail_pelabuhan.removeAttribute('id');

module.exports = v_detail_pelabuhan;