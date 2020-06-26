const Sequelize = require('sequelize');
const db = require('../../database/database');

var gen = db.define('tr_gen_invoice',
    {
        kode_probis: Sequelize.STRING,
        last_number: Sequelize.STRING,
        kd_layanan: Sequelize.BIGINT,
        tgl: Sequelize.STRING
    }, {
    schema: 'refrensi',
    freezeTableName: true,
    timestamps: false
}
);

gen.removeAttribute('id');
module.exports = gen;

