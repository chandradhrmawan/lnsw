const Sequelize = require('sequelize');
const db = require('../../database/database');
const masterBarang = require('../masterlist/MasterlistBarang');
const valuta = db.define('tr_valuta',{
	kd_valuta: {type:Sequelize.INTEGER,primaryKey:true,},
	ur_valuta: Sequelize.STRING
},{
	schema: 'refrensi',
	freezeTableName: true,
	timestamps: false
});

valuta.removeAttribute('id');

module.exports = valuta;