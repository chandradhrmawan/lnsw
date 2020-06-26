const Sequelize = require('sequelize');
const db = require('../../database/database');
const log = {}


log.tb_log = db.define('tb_log_layanan',
	{
		id_log 			: {
			type 			: Sequelize.INTEGER,
			primaryKey 		: true,
			autoIncrement 	: true
		},
		kd_layanan		: Sequelize.STRING,
		id_permohonan 	: Sequelize.STRING,
		action_type 	: Sequelize.STRING,
		username 		: Sequelize.STRING,
		date_action 	: Sequelize.DATE,
		payload 		: Sequelize.STRING,
		is_read 		: Sequelize.STRING
	},{
		schema: 'log_inswii',
		freezeTableName: true,
		timestamps: false
	}
);

log.v_log = db.define('v_log_layanan',
	{
		id_log 			: {
			type 			: Sequelize.INTEGER,
			primaryKey 		: true,
			autoIncrement 	: true
		},
		nama_layanan	: Sequelize.STRING,
		id_permohonan 	: Sequelize.STRING,
		action_type 	: Sequelize.STRING,
		username 		: Sequelize.STRING,
		date_action 	: Sequelize.DATE,
		// payload 		: Sequelize.STRING,
		is_read 		: Sequelize.STRING
	},{
		schema: 'log_inswii',
		freezeTableName: true,
		timestamps: false
	}
);

module.exports = log;