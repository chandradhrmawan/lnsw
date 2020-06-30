const Sequelize = require('sequelize');
const db = require('../../database/database');
const Masterlist = require('../masterlist/Masterlist');
const Perijinan = require('../refrensi/tr_perijinan_model');
const Dokumen = require('./M_Dokumen');
const Incoterm = require('../refrensi/tr_incoterm_model');
const Valuta = require('../refrensi/tr_valuta_model');
const M_DetailBarang = require('./M_DetailBarang');


var masterListBarang = db.define('td_hdr_masterlistbarang',
    {
        id_barang: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        id_permohonan: Sequelize.STRING,
        id_barang_parent: Sequelize.STRING,
        jenis_barang: Sequelize.STRING,
        kd_perijinan: Sequelize.STRING,
        nomor_izin: Sequelize.STRING,
        tgl_izin: Sequelize.DATE,
        id_dokumen: Sequelize.INTEGER,
        doc_name: Sequelize.STRING,
        jenis_harga: Sequelize.STRING,
        incoterm: Sequelize.STRING,
        kd_valuta: Sequelize.STRING,
        nilai: Sequelize.DOUBLE,
        berlaku: Sequelize.STRING,
        nib: Sequelize.STRING,
        uraian: Sequelize.STRING,
        create_at: Sequelize.DATE,
        update_at: Sequelize.DATE
    }, {
    schema: 'masterlist',
    freezeTableName: true,
    timestamps: false
}
);

masterListBarang.hasMany(M_DetailBarang, { foreignKey: 'id_barang' });
// masterListBarang.belongsTo(Masterlist, { foreignKey: 'id_permohonan' });
// Masterlist.hasOne(masterListBarang, { foreignKey: 'id_permohonan' });

masterListBarang.belongsTo(Perijinan, { foreignKey: 'kd_perijinan' });
Perijinan.hasOne(masterListBarang, { foreignKey: 'kd_perijinan' });

Dokumen.hasMany(masterListBarang, { foreignKey: 'id_dokumen' });
masterListBarang.belongsTo(Dokumen, { foreignKey: 'id_dokumen' });


// masterListBarang.belongsTo(Incoterm, { foreignKey: 'incoterm' });
// Incoterm.hasMany(masterListBarang, { foreignKey: 'incoterm' });

// masterListBarang.belongsTo(Valuta, { foreignKey: 'kd_valuta' });
// Valuta.hasMany(masterListBarang, { foreignKey: 'KD_VALUTA' });



masterListBarang.removeAttribute('id');
masterListBarang.hasMany(Valuta);

module.exports = masterListBarang;
// module.exports = (Sequelize, DataTypes) => {
//     const BarangModel = Sequelize.define('td_hdr_masterlistbarang', {
//         id_barang: {
//             type: DataTypes.CHAR(12)
//         },
//         id_permohonan: {
//             type: DataTypes.CHAR(17)
//         },
//         id_permohonan_parent: {
//             type: DataTypes.CHAR(17)
//         },
//         jenis_barang: {
//             type: DataTypes.STRING(45)
//         },
//         kd_perijinan: {
//             type: DataTypes.STRING(5)
//         },
//         nomor_izin: {
//             type: DataTypes.STRING(200)
//         },
//         tgl_izin: {
//             type: DataTypes.DATE,
//         },
//         kd_dokumen: {
//             type: DataTypes.STRING(5)
//         },
//         doc_name: {
//             type: DataTypes.STRING(200)
//         },
//         jenis_harga: {
//             type: DataTypes.STRING(200)
//         },
//         incoterm: {
//             type: DataTypes.STRING(5)
//         },
//         kd_valuta: {
//             type: DataTypes.STRING(3)
//         },
//         nilai: {
//             type: DataTypes.DOUBLE
//         },
//         berlaku: {
//             type: DataTypes.STRING(11)
//         }

//     }, {
//         schema: 'refrensi',
//         freezeTableName: true,
//         timestamps: false
//     });

//     BarangModel.removeAttribute('id');
//     return BarangModel;
// }