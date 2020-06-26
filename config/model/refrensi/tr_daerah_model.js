const Sequelize = require('sequelize');
const db = require('../../database/database');

var daerah = db.define('tr_daerah',
    {
        kd_daerah: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'kd_daerah',

        },
        daerah_kode: {
            type: Sequelize.STRING,
            field: 'daerah_kode',
        },
        daerah_induk: {
            type: Sequelize.STRING,
            field: 'daerah_induk',
        },
        daerah_nama: {
            type: Sequelize.STRING,
            field: 'daerah_nama',
        },
        daerah_tipe: {
            type: Sequelize.STRING,
            field: 'daerah_tipe',
        },
    }, {
    schema: 'refrensi',
    freezeTableName: true,
    timestamps: false
}
);

daerah.removeAttribute('id');
module.exports = daerah;

