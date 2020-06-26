const Sequelize = require('sequelize');
const db = require('../../database/database');

const masterWilayahKerja = db.define('td_wilayah_kerja', {
	id_permohonan: {
		type: Sequelize.BIGINT
	},
	kd_kota: {
		type: Sequelize.BIGINT
	},
	id_wilayah_kerja: {
		type: Sequelize.BIGINT
	},
	rt_rw: {
		type: Sequelize.CHAR(20)
	},
	alamat: {
		type: Sequelize.CHAR(1000)	
	}
}, {
	schema: 'masterlist',
	freezeTableName: true,
	timestamps: false
});

masterWilayahKerja.removeAttribute('id');
module.exports = masterWilayahKerja;