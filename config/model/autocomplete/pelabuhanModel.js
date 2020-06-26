const Sequelize = require('sequelize');
const db = require('../../database/database');

const pelabuhan = db.define('pelabuhan', {
	kode_pelabuhan: {
		type: Sequelize.CHAR(5)
	},
	nama_pelabuhan: {
		type: Sequelize.CHAR(50)
	}
}, {
	schema: 'refrence_schem',
	freezeTableName: true,
	timestamps: false
});

pelabuhan.removeAttribute('id');
module.exports = pelabuhan;