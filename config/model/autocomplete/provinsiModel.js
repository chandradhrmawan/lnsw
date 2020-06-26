const Sequelize = require('sequelize');
const db = require('../../database/database');

const provinsi = db.define('provinsi', {
	kodeprovinsi: {
		type: Sequelize.CHAR(4)
	},
	namaprovinsi: {
		type: Sequelize.CHAR(50)
	}
}, {
	schema: 'refrence_schem',
	freezeTableName: true,
	timestamps: false
});
provinsi.removeAttribute('id');
module.exports = provinsi;