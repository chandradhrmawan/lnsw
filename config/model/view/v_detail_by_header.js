const Sequelize = require('sequelize');
const db = require('../../database/database');

const v_detail_by_header = db.define('v_detail_by_header', {
	id_detailmasterlist_barang: Sequelize.BIGINT,
	serial_num_urut: Sequelize.BIGINT,
	kd_hs: Sequelize.STRING,
	spesifikasi: Sequelize.STRING,
	jml_satuan: Sequelize.BIGINT,
	kd_satuan: Sequelize.STRING,
	jenis_fasilitas: Sequelize.STRING,
	incoterm: Sequelize.STRING,
	kd_valuta: Sequelize.STRING,
	nilai: Sequelize.DOUBLE,
	id_dokumen: Sequelize.BIGINT,
	kd_detail_negara: Sequelize.BIGINT,
	berlaku: Sequelize.STRING,
	deskripsi_hs: Sequelize.STRING,
	ur_barang: Sequelize.STRING,
	id_barang: Sequelize.STRING,
	kd_status_detailbarang: Sequelize.INTEGER,
	id_hscode: Sequelize.BIGINT,
	hd_code_format: Sequelize.STRING,
	id_takik: Sequelize.STRING,
	uraian_id: Sequelize.STRING,
	uraian_en: Sequelize.STRING,
	bm_mfn: Sequelize.STRING,
	no_skep: Sequelize.STRING,
	tanggal_skep: Sequelize.STRING,
	berlaku_hscode: Sequelize.STRING,
	fl_use: Sequelize.STRING,
	create_dt: Sequelize.STRING,
	ur_satuan: Sequelize.STRING,
	ur_incoterm: Sequelize.STRING,
	ur_valuta: Sequelize.STRING,
	kd_dokumen: Sequelize.STRING,
	nomor_dokumen: Sequelize.STRING,
	tgl_dokumen: Sequelize.DATE,
	filename_dokumen: Sequelize.STRING,
	no_seri_dokumen: Sequelize.BIGINT,
	nib: Sequelize.STRING,
	ur_jenis_dokumen: Sequelize.STRING,
	id_permohonan: Sequelize.STRING
},{
	schema: 'masterlist',
	freezeTableName: true,
	timestamps: false,
});

v_detail_by_header.removeAttribute('id');
module.exports = v_detail_by_header;