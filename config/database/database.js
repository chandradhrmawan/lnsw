var Sequelize = require('sequelize');
var db = new Sequelize(process.env.DB_SCEM, process.env.DB_USER, process.env.DB_PASS, {
	dialect: process.env.DB_DIALECT,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT
});


// const db = {};

// db.sequelize = sequelize;
// db.sequelize = Sequelize;

// <<<<<<< HEAD
// // Model Autocomplete
// db.tr_satuan = require('../model/refrensi/tr_satuan_model')(sequelize, Sequelize);
// db.tr_kota = require('../model/refrensi/tr_kota_model')(sequelize, Sequelize);
// db.tr_negara = require('../model/refrensi/tr_negara_model')(sequelize, Sequelize);
// =======
// Model Autocomplete
// db.tr_satuan = require('../model/refrensi/tr_satuan_model')(sequelize, Sequelize);
// db.tr_kota = require('../model/refrensi/tr_kota_model')(sequelize, Sequelize);
// db.tr_negara = require('../model/refrensi/tr_negara_model')(sequelize, Sequelize);
// db.tr_pelabuhan = require('../model/refrensi/tr_pelabuhan_model')(sequelize, Sequelize);
// db.tr_provinsi = require('../model/refrensi/tr_provinsi_model')(sequelize, Sequelize);
// db.tr_perijinan = require('../model/refrensi/tr_perijinan_model')(sequelize, Sequelize);
// db.tr_status_perijinan = require('../model/refrensi/tr_status_perijinan_model')(sequelize, Sequelize);
// db.tr_ga = require('../model/refrensi/tr_ga_model')(sequelize, Sequelize);
// db.tr_hscode = require('../model/refrensi/tr_hscode_model')(sequelize, Sequelize);
// db.tr_incoterm = require('../model/refrensi/tr_incoterm_model')(sequelize, Sequelize);
// db.tr_jenis_dokumen = require('../model/refrensi/tr_jenis_dokumen_model')(sequelize, Sequelize);
// db.tr_jenis_permohonan = require('../model/refrensi/tr_jenis_permohonan_model')(sequelize, Sequelize);
// db.tr_valuta = require('../model/refrensi/tr_valuta_model')(sequelize, Sequelize);
// >>>>>>> 86d9406439f073699df971a03a157a9ec4118cae

// db.pelabuhan = require('../model/autocomplete/pelabuhanModel')(sequelize, Sequelize);
// db.provinsi = require('../model/autocomplete/provinsiModel')(sequelize, Sequelize);
// db.jenisDok = require('../model/autocomplete/jenisDokRefrensi')(sequelize, Sequelize);
// // End Model Autocomplete

// // Model DocumentLayanan
// db.documentLayanan = require('../model/documentLayanan/documentLayanan')(sequelize, Sequelize);
// // End Model DocumentLayanan

module.exports = db;
