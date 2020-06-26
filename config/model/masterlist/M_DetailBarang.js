const Sequelize = require('sequelize');
const db = require('../../database/database');
// const Incoterm = require('../refrensi/tr_incoterm_model');


const masterDetilBarang = db.define('td_detail_masterlistbarang', {
	id_detailmasterlist_barang: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	serial_num_urut: {
		type: Sequelize.BIGINT
	},
	kd_hs: {
		type: Sequelize.CHAR(45)
	},
	spesifikasi: {
		type: Sequelize.CHAR(200)
	},
	jml_satuan: {
		type: Sequelize.BIGINT
	},
	kd_satuan: {
		type: Sequelize.CHAR(5)
	},
	jenis_fasilitas: {
		type: Sequelize.CHAR(100)
	},
	incoterm: {
		type: Sequelize.CHAR(5)
	},
	kd_valuta: {
		type: Sequelize.CHAR(3)
	},
	nilai: {
		type: Sequelize.DOUBLE
	},
	id_dokumen: {
		type: Sequelize.BIGINT
	},
	kd_detail_negara: {
		type: Sequelize.BIGINT
	},
	berlaku: {
		type: Sequelize.CHAR(1)
	},
	deskripsi_hs: {
		type: Sequelize.CHAR(200)
	},
	ur_barang: {
		type: Sequelize.CHAR(200)
	},
	id_barang: {
		type: Sequelize.CHAR(200)
	},
	kd_status_detailbarang: {
		type: Sequelize.CHAR(200)
	}
}, {
	schema: 'masterlist',
	freezeTableName: true,
	timestamps: false
});

// masterDetilBarang.hasMany(Incoterm, {foreignKey: 'incoterm'});

module.exports = masterDetilBarang;