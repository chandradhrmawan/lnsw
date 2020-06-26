const Sequelize = require('sequelize');
const db = require('../../database/database');

const documentsLayanan = db.define('documentLayanan', {
	id_document: {
		type: Sequelize.INTEGER
	},
	ID_pengajuan: {
		type: Sequelize.CHAR(26)
	},
	id_seri: {
		type: Sequelize.INTEGER
	},
	kode_dokumen: {
		type: Sequelize.CHAR(3)
	},
	Nomor_dokumen: {
		type: Sequelize.CHAR(50)
	},
	Tanggal_dokumen: {
		type: Sequelize.TEXT
	},
	File_Path: {
		type: Sequelize.CHAR(200)
	},
	id_user: {
		type: Sequelize.INTEGER
	},
	Tgl_upload: {
		type: Sequelize.DATE
	}
}, {
	schema: 'refrence_schem',
	freezeTableName: true,
	timestamps: false
});

documentsLayanan.removeAttribute('id');
module.exports = documentsLayanan;