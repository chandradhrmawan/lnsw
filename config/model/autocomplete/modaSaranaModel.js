const Sequelize = require('sequelize');
const db = require('../../database/database');

const modaSarana = db.define('modasaranaangkut', {
	kodemodasaranaangkut: {
		type: Sequelize.INTEGER
	},
	namamodasaranaangkut: {
		type: Sequelize.CHAR(30)
	},
	flagberlaku: {
		type: Sequelize.BOOLEAN
	}
}, {
	schema: 'refrence_schem',
	freezeTableName: true,
	timestamps: false
});

modaSarana.removeAttribute('id');
module.exports = modaSarana;