const Sequelize = require('sequelize');
const db = require('../../database/database');

var probis = db.define('tr_probis',
    {
        kode_probis: Sequelize.STRING,
        ur_probis: Sequelize.STRING
    }, {
    schema: 'refrensi',
    freezeTableName: true,
    timestamps: false
}
);

probis.removeAttribute('id');
module.exports = probis;

