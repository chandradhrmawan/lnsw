
const Sequelize = require('sequelize');
const db = require('../../database/database');


var masterList = db.define('td_masterlist',
    {
        id_permohonan: Sequelize.STRING,
        id_permohonan_parent: Sequelize.STRING,
        kd_jenis_permohonan: Sequelize.STRING,
        no_keputusan: Sequelize.STRING,
        no_keputusan_parent: Sequelize.STRING,
        tgl_keputusan: Sequelize.DATE,
        tgl_akhir_berlaku: Sequelize.DATE,
        nib: Sequelize.STRING,
        npwp: Sequelize.STRING,
        nama_perusahaan: Sequelize.STRING,
        alamat_perusahaan: Sequelize.STRING,
        rt_rw_perusahaan: Sequelize.STRING,
        kelurahan: Sequelize.STRING,
        kd_kota: Sequelize.BIGINT,
        kd_pos: Sequelize.STRING,
        no_telepon: Sequelize.STRING,
        no_fax: Sequelize.STRING,
        email: Sequelize.STRING,
        nama_penanggung_jawab: Sequelize.STRING,
        jbt_penangungjawab: Sequelize.STRING,
        kd_kek: Sequelize.BIGINT,
        kd_kppbc: Sequelize.STRING,
        kd_kota_pengajuan: Sequelize.BIGINT,
        kd_status_perijinan: Sequelize.STRING,
        tujuan_kegiatan: Sequelize.STRING,
        id_wilayah_kerja: Sequelize.BIGINT

    }, {
    schema: 'masterlist',
    freezeTableName: true,
    timestamps: false
}
);

masterList.removeAttribute('id');
module.exports = masterList;