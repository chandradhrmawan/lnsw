const Sequelize = require('sequelize');
const db = require('../../database/database');
const masterList = require('./Masterlist');

const masterKoresponden = db.define('td_korespodensi', {
	id_korespodensi: {
		type: Sequelize.BIGINT,
		primaryKey: true,
		autoIncrement: true,
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
	kd_provinsi: {
		type: Sequelize.BIGINT
	},
	kd_kota: {
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

// masterList.hasMany(masterKoresponden, { foreignKey: 'id_permohonan' });
// masterKoresponden.belongsTo(masterList, { foreignKey: 'id_permohonan' });

module.exports = masterKoresponden;