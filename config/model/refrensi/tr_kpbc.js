const Sequelize = require('sequelize');
const db = require('../../database/database');

var tr_kpbc = db.define('tr_kpbc',
	{
		kd_kpbc: {type:Sequelize.INTEGER,primaryKey: true},
		urkdkpbc: Sequelize.STRING,
		kota: Sequelize.STRING,
		fl_nsw: Sequelize.STRING,
		jmhr_kerja: Sequelize.INTEGER,
		id_event_impor: Sequelize.STRING,
		id_event_ekspor: Sequelize.STRING,
		create_dt: Sequelize.DATE,
	},{
		schema: 'refrensi',
		freezeTableName: true,
		timestamps: false
	}
);

module.exports = tr_kpbc;