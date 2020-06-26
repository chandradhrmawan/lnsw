const Sequelize = require('sequelize');
const db = require('../../database/database');

const jenisDok = db.define('jenisdokreferensi', {
	kodejenisdokrerensi: {
		type: Sequelize.STRING
	},
	namajenisdokreferensi: {
		type: Sequelize.STRING
	}
}, {
	schema: 'refrence_schem',
	freezeTableName: true,
	timestamps: false
});

jenisDok.removeAttribute('id');
module.exports = jenisDok;