const Sequelize = require('sequelize');
const db = require('../../database/database');

const v_korespodensi = db.define('v_korespodensi', {
	id_permohonan: Sequelize.STRING,
	nib: Sequelize.STRING,
	id_korespodensi: Sequelize.BIGINT,
	tipe: Sequelize.STRING,
	nama: Sequelize.STRING,
	jabatan: Sequelize.STRING,
	alamat: Sequelize.DATE,
	jenis: Sequelize.STRING,
	nomor: Sequelize.STRING,
	notelepon: Sequelize.STRING,
	notlp: Sequelize.STRING,
	email: Sequelize.STRING,
}, {
	schema: 'masterlist',
	freezeTableName: true,
	timestamps: false
});

v_korespodensi.removeAttribute('id');

module.exports = v_korespodensi;