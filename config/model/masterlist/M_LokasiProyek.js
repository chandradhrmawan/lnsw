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
		type: Sequelize.CHAR(100)
	},
	kelurahan: {
		type: Sequelize.CHAR(100)
	},
	kd_kota: {
		type: Sequelize.BIGINT
	},
	kode_pos: {
		type: Sequelize.CHAR(5)
	}
}, {
	schema: 'masterlist',
	freezeTableName: true,
	timestamps: false
});

module.exports = masterLokasiProyek;