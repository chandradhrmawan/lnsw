const Sequelize = require('sequelize');
const db = require('../../database/database');
const view = {};


view.v_masterList_head = db.define('v_masterlist_head',
    {
        id_permohonan: {type:Sequelize.STRING,primaryKey:true},
        id_permohonan_parent        : Sequelize.STRING,
        kd_jenis_permohonan         : Sequelize.STRING,
        no_keputusan                : Sequelize.STRING,
        no_keputusan_parent         : Sequelize.STRING,
        tgl_keputusan               : Sequelize.DATE,
        tgl_akhir_berlaku           : Sequelize.DATE,
        nib                         : Sequelize.STRING,
        npwp                        : Sequelize.STRING,
        nama_perusahaan             : Sequelize.STRING,
        alamat_perusahaan           : Sequelize.STRING,
        rt_rw_perusahaan            : Sequelize.STRING,
        kelurahan                   : Sequelize.STRING,
        kd_kota                     : Sequelize.BIGINT,
        kd_pos                      : Sequelize.STRING,
        no_telepon                  : Sequelize.STRING,
        no_fax                      : Sequelize.STRING,
        email                       : Sequelize.STRING,
        nama_penanggung_jawab       : Sequelize.STRING,
        jbt_penangungjawab          : Sequelize.STRING,
        kd_kek                      : Sequelize.BIGINT,
        kd_kppbc                    : Sequelize.STRING,
        kd_kota_pengajuan           : Sequelize.BIGINT,
        kd_status_perijinan         : Sequelize.STRING,
        tujuan_kegiatan             : Sequelize.STRING,
        id_wilayah_kerja            : Sequelize.BIGINT,
        id_kota                     : Sequelize.BIGINT,
        ibu_kota                    : Sequelize.STRING,
        nama_kota_kabupaten         : Sequelize.STRING,
        kd_provinsi                 : Sequelize.STRING,
        ur_kek                      : Sequelize.STRING,
        kd_kota                     : Sequelize.INTEGER,
        urkdkpbc                    : Sequelize.STRING,
        kota                        : Sequelize.STRING,
        fl_nsw                      : Sequelize.STRING,
        jmhr_kerja                  : Sequelize.INTEGER,
        id_event_impor              : Sequelize.STRING,
        id_event_ekspor             : Sequelize.STRING,
        create_dt                   : Sequelize.DATE,
        ur_status_perijinan         : Sequelize.STRING,
        ur_permohonan               : Sequelize.STRING,
        tgl_pengajuan               : Sequelize.STRING,
        ur_proses                   : Sequelize.STRING,
        ur_status_perijinan         : Sequelize.STRING
    }, {
    schema: 'masterlist',
    freezeTableName: true,
    timestamps: false
}
);


view.v_pengajuan_masterlist = db.define('v_pengajuan_masterlist',
    {
        nomor_pengajuan : {
            type        : Sequelize.STRING,
            primaryKey  : true
        },
        tanggal_pengajuan          : Sequelize.STRING,
        identitas_lain             : Sequelize.STRING,
        nomor_identias             : Sequelize.STRING,
        jenis_pengajuan            : Sequelize.STRING,
        tujuan_kegiatan            : Sequelize.STRING,
        provinsi                   : Sequelize.STRING,
        kota                       : Sequelize.STRING,
        kecamatan                  : Sequelize.STRING,
        kelurahan                  : Sequelize.STRING,
        kd_pos                     : Sequelize.STRING,
        rt_rw                      : Sequelize.STRING,
        alamat                     : Sequelize.STRING,
        provinsi_pengajuan         : Sequelize.STRING,
        kota_pengajuan             : Sequelize.STRING,
        kecamatan_pengajuan        : Sequelize.STRING,
        kelurahan_pengajuan        : Sequelize.STRING,
        kd_kek                     : Sequelize.STRING,
        ur_kek                     : Sequelize.STRING,
        kd_kpbc                    : Sequelize.STRING,
        urkdkpbc                   : Sequelize.STRING,
        provinsi_lokasi_proyek     : Sequelize.STRING,
        kota_lokasi_proyek         : Sequelize.STRING,
        kecamatan_lokasi_proyek    : Sequelize.STRING,
        kelurahan_lokasi_proyek    : Sequelize.STRING,
        alamat_lokasi_proyek       : Sequelize.STRING,
        kd_pos_lokasi_proyek       : Sequelize.STRING,
        rt_rw_proyek               : Sequelize.STRING,
        provinsi_wilayah_kerja     : Sequelize.STRING,
        kota_wilayah_kerja         : Sequelize.STRING,
        kecamatan_wilayah_kerja    : Sequelize.STRING,
        kelurahan_wilayah_kerja    : Sequelize.STRING,
        alamat_wilayah_kerja       : Sequelize.STRING,
        kd_pos_wilayah_kerja       : Sequelize.STRING,
        rt_rw_wilayah_kerja        : Sequelize.STRING
    },{
    schema: 'masterlist',
    freezeTableName: true,
    timestamps: false
}
);

view.v_dokumen_masterlist = db.define('v_dokumen_masterlist',
    {
        id_dokumen : {
            type        : Sequelize.STRING,
            primaryKey  : true
        },
        no               : Sequelize.STRING,
        kd_dokumen       : Sequelize.STRING,
        ur_jenis_dokumen : Sequelize.STRING,
        nomor_dokumen    : Sequelize.STRING,
        tgl_dokumen      : Sequelize.STRING,
        filename_dokumen : Sequelize.STRING,
        id_permohonan    : Sequelize.STRING,
        no_seri_dokumen  : Sequelize.STRING,
        nib              : Sequelize.STRING
    },{
    schema: 'masterlist',
    freezeTableName: true,
    timestamps: false
}
);

module.exports = view;