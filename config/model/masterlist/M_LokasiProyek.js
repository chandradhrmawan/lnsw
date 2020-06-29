const Sequelize = require('sequelize');
const db = require('../../database/database');

const masterLokasiProyek = db.define('td_lokasi_proyek', {
	id_lok_proyek: {
		type : Sequelize.BIGINT,
		primaryKey : true,
		autoIncrement : true
	},
	id_permohonan: {
		type: Sequelize.CHAR(26)
	},
	rt_rw_proyek: {
		type: Sequelize.STRING
	},
	kd_kota: {
		type: Sequelize.BIGINT
	},
	kd_provinsi: {
		type: Sequelize.BIGINT
	},
	kd_kecamatan: {
		type: Sequelize.BIGINT
	},
	kd_kelurahan: {
		type: Sequelize.BIGINT
	},
	kd_pos: {
		type: Sequelize.BIGINT
	},
	alamat: {
		type: Sequelize.CHAR(100)
	}
}, {
	schema: 'masterlist',
	freezeTableName: true,
	timestamps: false
});

module.exports = masterLokasiProyek;