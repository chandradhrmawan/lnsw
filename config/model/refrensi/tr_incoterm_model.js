const Sequelize = require('sequelize');
const db = require('../../database/database');

var incoterm = db.define('tr_incoterm',
	{
		incoterm: {type:Sequelize.STRING,primaryKey:true,},
		ur_incoterm: Sequelize.STRING
	},{
		schema: 'refrensi',
		freezeTableName: true,
		timestamps: false
	}
);

module.exports = incoterm;


