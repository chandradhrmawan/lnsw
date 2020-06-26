const Sequelize = require('sequelize');
const db = require('../../database/database');

const masterPelb = db.define('td_pelb_masterlist', {
	id_pelb_masterlist: {
		type: Sequelize.BIGINT
	},
	kd_pelabuhan: {
		type: Sequelize.CHAR(5)
	},
	type_pelabuhan: {
		type: Sequelize.CHAR(200)
	},
	id_permohonan: {
		type: Sequelize.CHAR(17)
	}
}, {
	schema: 'masterlist',
	freezeTableName: true,
	timestamps: false
});

masterPelb.removeAttribute('id');
module.exports = masterPelb;