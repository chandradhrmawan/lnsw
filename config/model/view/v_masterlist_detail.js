const Sequelize = require('sequelize');
const db = require('../../database/database');

const v_masterlist_detail = db.define('v_masterlist_detail', {
	id_permohonan: Sequelize.STRING,
	id_permohonan_parent: Sequelize.STRING,
	id_barang: Sequelize.STRING,
	jenis_barang: Sequelize.STRING,
	kd_perijinan: Sequelize.STRING,
	nomor_izin: Sequelize.STRING,
	tgl_izin: Sequelize.DATE,
	doc_name: Sequelize.STRING,
	jenis_harga: Sequelize.STRING,
	incoterm: Sequelize.STRING,
	ur_incoterm: Sequelize.STRING,
	kd_valuta: Sequelize.STRING,
	ur_valuta: Sequelize.STRING,
	nilai: Sequelize.DOUBLE,
	berlaku: Sequelize.STRING,
	nib: Sequelize.STRING,
	kd_dokumen: Sequelize.BIGINT,
	id_detailmasterlist_barang: Sequelize.BIGINT,
	serial_num_urut:  Sequelize.BIGINT,
	kd_hs: Sequelize.STRING,
	id_hscode: Sequelize.BIGINT,
	hd_code_format: Sequelize.STRING,
	id_takik: Sequelize.STRING,
	uraian_id: Sequelize.STRING,
	uraian_en: Sequelize.STRING,
	bm_mfn: Sequelize.STRING,
	no_skep: Sequelize.STRING,
	tanggal_skep: Sequelize.STRING,
	fl_use: Sequelize.STRING,
	create_dt: Sequelize.STRING,
	spesifikasi: Sequelize.STRING,
	jml_satuan: Sequelize.BIGINT,
	kd_satuan: Sequelize.STRING,
	ur_satuan: Sequelize.STRING,
	jenis_fasilitas: Sequelize.STRING,
	detail_incoterm: Sequelize.STRING,
	detail_urincoterm: Sequelize.STRING,
	detail_kdvaluta: Sequelize.STRING,
	detail_urvaluta: Sequelize.STRING,
	detail_nilai: Sequelize.DOUBLE,
	detail_iddokumen: Sequelize.BIGINT,
	kd_detail_negara: Sequelize.BIGINT,
	detail_berlaku: Sequelize.STRING,
	deskripsi_hs: Sequelize.STRING,
	ur_barang: Sequelize.STRING,
	detail_idbarang: Sequelize.STRING,
	kd_status_detailbarang: Sequelize.INTEGER
},{
	schema: 'masterlist',
	freezeTableName: true,
	timestamps: false
});

v_masterlist_detail.removeAttribute('id');

module.exports = v_masterlist_detail;