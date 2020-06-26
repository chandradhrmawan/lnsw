const Sequelize = require('sequelize');
const db = require('../../database/database');

const negara = db.define('negara', {
	kode_negara: {
		type: Sequelize.CHAR(2),
	},
	nama_negara: {
		type: Sequelize.CHAR(50)
	}
}, {
	schema: 'refrence_schem',
	freezeTableName: true,
	timestamps: false
})

negara.removeAttribute('id');
module.exports = negara;