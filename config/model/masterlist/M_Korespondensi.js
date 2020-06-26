const Sequelize = require('sequelize');
const db = require('../../database/database');

const masterKoresponden = db.define('td_korespodensi', {
	id_korespondensi: {
		type: Sequelize.BIGINT
	},
	id_permohonan: {
		type: Sequelize.CHAR(17)
	},
	tipe_korespodensi: {
		type: Sequelize.CHAR(100)
	},
	nama_korespodensi: {
		type: Sequelize.CHAR(100)
	},
	jbt_korespodensi: {
		type: Sequelize.CHAR(100)
	},
	alamat_korespodensi: {
		type: Sequelize.CHAR(100)
	},
	jenis_identitas: {
		type: Sequelize.CHAR(100)
	},
	nomor_identias: {
		type: Sequelize.CHAR(100)
	},
	no_telepon: {
		type: Sequelize.CHAR(20)
	},
	no_hp: {
		type: Sequelize.CHAR(20)
	},
	email: {
		type: Sequelize.CHAR(50)
	}
}, {
	schema: 'masterlist',
	freezeTableName: true,
	timestamps: false
});

masterKoresponden.removeAttribute('id');
module.exports = masterKoresponden;