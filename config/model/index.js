// Model Autocomplete
const dokumen = require('./masterlist/M_Dokumen');
const masterListBarang = require('./masterlist/MasterlistBarang');
// End Model Autocomplete

// Model Upload Document Layanan
const documentLayanan = require('./documentLayanan/documentLayanan');
// End Model Upload Document Layanan

// Masterlist
const MasterlistBarang = require('./masterlist/MasterlistBarang');
const M_DetailBarang = require('./masterlist/M_DetailBarang');
const M_DetailBarangPelabuhan = require('./masterlist/M_DetailBarangPelabuhan');
const M_Korespodensi = require('./masterlist/M_Korespondensi');
const M_LokasiProyek = require('./masterlist/M_LokasiProyek');
const M_Pelb = require('./masterlist/M_Pelb');
const M_WilayahKerja = require('./masterlist/M_WilayahKerja');
// Endmasterlist

// Model Masterlist
const masterList = require('./masterlist/Masterlist');
// End Model Masterlist

// MODEL REFRENSI
const satuan = require('./refrensi/tr_satuan_model');
const kota = require('./refrensi/tr_kota_model');
const negara = require('./refrensi/tr_negara_model');
const pelabuhan = require('./refrensi/tr_pelabuhan_model');
const provinsi = require('./refrensi/tr_provinsi_model');
const perijinan = require('./refrensi/tr_perijinan_model');
const status_perijinan = require('./refrensi/tr_status_perijinan_model');
const ga = require('./refrensi/tr_ga_model');
const hscode = require('./refrensi/tr_hscode_model');
const incoterm = require('./refrensi/tr_incoterm_model');
const jenis_dokumen = require('./refrensi/tr_jenis_dokumen_model');
const jenis_permohonan = require('./refrensi/tr_jenis_permohonan_model');
const valuta = require('./refrensi/tr_valuta_model');
const tr_kek = require('./refrensi/tr_kek');
const probis = require('./refrensi/tr_probis_model');
const gen = require('./refrensi/tr_gen_invoice');
const daerah = require('./refrensi/tr_daerah_model');
const list_hscode = require('./refrensi/tr_listhscode_kek');
const kurs = require('./refrensi/tr_kurs_model');
const jenisBarang = require('./refrensi/jenisBarang');
// END MODEL REFRENSI

// MODEL BERITA
const berita = require('./berita/berita');
const berita_category = require('./berita/berita_category');
const berita_file = require('./berita/berita_file');
const berita_detail = require('./berita/berita_detail');
// END MODEL BERITA

// Model pengajuanMasterlist
const M_PengajuanMasterlist = require('./masterlist/M_PengajuanMasterlist');
// End Model pengajuanMasterlist


/*model view*/
const v_masterlist_head = require('./view/v_masterlist_head');
const v_masterlist_detail = require('./view/v_masterlist_detail');
/*end model view*/

/*model log*/
const log = require('./log/log');
/*end model log*/

const model = {};
model.documentLayanan = documentLayanan;
model.dokumen = dokumen;
model.masterListBarang = masterListBarang;
model.MasterlistBarang = MasterlistBarang;
model.M_DetailBarang = M_DetailBarang;
model.M_DetailBarangPelabuhan = M_DetailBarangPelabuhan;
model.M_Korespodensi = M_Korespodensi;
model.M_LokasiProyek = M_LokasiProyek;
model.M_Pelb = M_Pelb;
model.M_WilayahKerja = M_WilayahKerja;

// MODEL REFRENSI
model.satuan = satuan;
model.kota = kota;
model.negara = negara;
model.pelabuhan = pelabuhan;
model.provinsi = provinsi;
model.perijinan = perijinan;
model.status_perijinan = status_perijinan;
model.ga = ga;
model.hscode = hscode;
model.incoterm = incoterm;
model.jenis_dokumen = jenis_dokumen;
model.jenis_permohonan = jenis_permohonan;
model.valuta = valuta;
model.tr_kek = tr_kek;
model.probis = probis;
model.gen = gen;
model.daerah = daerah;
model.list_hscode = list_hscode;
model.kurs = kurs;
model.jenisBarang = jenisBarang;
//END MODEL REFRENSI

// MODEL BERITA
model.berita = berita;
model.berita_category = berita_category;
model.berita_file = berita_file;
model.berita_detail = berita_detail;
// END MODEL BERITA

model.masterList = masterList;
model.M_PengajuanMasterlist = M_PengajuanMasterlist;

/*model view*/
model.v_masterlist_head = v_masterlist_head;
model.v_masterlist_detail = v_masterlist_detail;
/*model view*/

model.tb_log = log.tb_log;
model.v_log = log.v_log;

module.exports = model;