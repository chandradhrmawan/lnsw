const Sequelize = require('sequelize');
const db = require('../../database/database');

const masterDokumen = db.define('td_dokumen', {
	kd_dokumen: {
		type: Sequelize.CHAR(5)
	},
	nomor_dokumen: {
		type: Sequelize.CHAR(100)
	},
	tgl_dokumen: {
		type: Sequelize.DATE
	},
	filename_dokumen: {
		type: Sequelize.CHAR(100)
	},
	id_dokumen: {
		type: Sequelize.BIGINT,
		autoIncrement: true,
		primaryKey: true
	},
	id_permohonan: {
		type: Sequelize.CHAR(17)
	},
	no_seri_dokumen: {
		type: Sequelize.BIGINT
	},
	nib: {
		type: Sequelize.CHAR(26)
	}
}, {
	schema: 'masterlist',
	freezeTableName: true,
	timestamps: false
});

masterDokumen.removeAttribute('id');
module.exports = masterDokumen;