const Sequelize = require('sequelize');
const db = require('../../database/database');

const jenisSatuan = db.define('jenis_satuan', {
	kode_jenis_satuan: {
		type: Sequelize.CHAR(5)
	},
	nama_satuan: {
		type: Sequelize.CHAR(100)
	}
}, {
	schema: 'refrence_schem',
	freezeTableName: true,
	timestamps: false
});

jenisSatuan.removeAttribute('id');
module.exports = jenisSatuan;