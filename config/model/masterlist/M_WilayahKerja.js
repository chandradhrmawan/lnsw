const Sequelize = require('sequelize');
const db = require('../../database/database');


const masterWilayahKerja = db.define('td_wilayah_kerja', {
	kd_kota: {
		type: Sequelize.BIGINT
	},
	id_wilayah_kerja: {
		type: Sequelize.BIGINT,
		primaryKey:true,
		autoIncrement:true
	},
	id_permohonan: {
		type: Sequelize.BIGINT
	},
	rt_rw_wilayah_kerja: {
		type: Sequelize.CHAR(20)
	},
	kd_provinsi: {
		type: Sequelize.CHAR(20)
	},
	kd_kecamatan: {
		type: Sequelize.CHAR(20)
	},
	kd_kelurahan: {
		type: Sequelize.CHAR(20)
	},
	kd_pos: {
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

module.exports = masterWilayahKerja;