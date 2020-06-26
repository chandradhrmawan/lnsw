
const Sequelize = require('sequelize');
const db = require('../../database/database');


var v_masterList_head = db.define('v_masterlist_head',
    {
        id_permohonan: {type:Sequelize.STRING,primaryKey:true},
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
        id_wilayah_kerja: Sequelize.BIGINT,
        id_kota:Sequelize.BIGINT,
        ibu_kota:Sequelize.STRING,
        nama_kota_kabupaten:Sequelize.STRING,
        kd_provinsi:Sequelize.STRING,
        ur_kek:Sequelize.STRING,
        kd_kota:Sequelize.INTEGER,
        urkdkpbc :Sequelize.STRING,
        kota:Sequelize.STRING,
        fl_nsw:Sequelize.STRING,
        jmhr_kerja:Sequelize.INTEGER,
        id_event_impor:Sequelize.STRING,
        id_event_ekspor:Sequelize.STRING,
        create_dt:Sequelize.DATE,
        ur_status_perijinan:Sequelize.STRING,
        ur_permohonan:Sequelize.STRING,
        tgl_pengajuan:Sequelize.STRING,
        ur_proses:Sequelize.STRING,
        ur_status_perijinan:Sequelize.STRING
    }, {
    schema: 'masterlist',
    freezeTableName: true,
    timestamps: false
}
);

module.exports = v_masterList_head;