const Sequelize = require('sequelize');
const db = require('../../database/database');

const kota = db.define('kota', {
	nomor: {
		type: Sequelize.INTEGER
	},
	kodekota: {
		type: Sequelize.CHAR(3)
	},
	namaibukota: {
		type: Sequelize.CHAR(50)
	},
	namakabupaten: {
		type: Sequelize.CHAR(50)
	},
	namaprovinsi: {
		type: Sequelize.CHAR(4)
	}
}, {
	schema: 'refrence_schem',
	freezeTableName: true,
	timestamps: false
});

kota.removeAttribute('id');
module.exports = kota;