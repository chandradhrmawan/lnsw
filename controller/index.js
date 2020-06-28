const documentLayanan = require('./documentLayanan/documentLayanan');

const dokumen = require('./masterlist/DokumenController');
const masterListBarang = require('./masterlist/MasterlistBarang');

const M_DetailBarangUpload = require('./masterlist/M_DetailBarangUpload');
const M_DetailBarangForm = require('./masterlist/M_DetailBarangForm');
const updateDetailDokumen = require('./masterlist/updateDokumenMasterlist');
const M_DetailBarangPelabuhan = require('./masterlist/M_DetailBarangPelabuhan');
const M_Korespodensi = require('./masterlist/M_Korespodensi');
const M_LokProyek = require('./masterlist/M_LokasiProyek');
const M_WilayahKerja = require('./masterlist/M_WilayahKerja');
const M_Pelb = require('./masterlist/M_Pelb');
const masterList = require('./masterlist/Masterlist');
const pengajuanMasterlist = require('./masterlist/pengajuanMasterlistController');
const generate = require('./masterlist/generateCodeController');
// CONTROLLER REFRENSI
const satuan = require('./refrensi/Satuan');
const kota = require('./refrensi/Kota');
const negara = require('./refrensi/Negara');
const pelabuhan = require('./refrensi/Pelabuhan');
const provinsi = require('./refrensi/Provinsi');
const perijinan = require('./refrensi/Perijinan');
const status_perijinan = require('./refrensi/Status_perijinan');
const ga = require('./refrensi/Ga');
const hscode = require('./refrensi/Hscode');
const incoterm = require('./refrensi/Incoterm');
const jenis_dokumen = require('./refrensi/Jenis_dokumen');
const jenis_permohonan = require('./refrensi/Jenis_permohonan');
const valuta = require('./refrensi/Valuta');
const daerah = require('./refrensi/Daerah');
const listHs = require('./refrensi/ListHscode');
const kurs = require('./refrensi/Kurs');
const layanan = require('./refrensi/layanan');
const menu = require('./acl/menu');
const login = require('./acl/login');
const pg = require('./pg/pg');
const jenisBarang = require('./refrensi/jenisBarang');
const log = require('./log/log');
const kek = require('./refrensi/Kek');
// END CONTROLLER REFRENSI
// const sendEmail = require('./sendNotification/sendEmail');

// CONTROLLER BERITA
const berita = require('./berita/Berita');
// END CONTROLLER BERITA

// CONTROLLER ELASTICSEARCH
const es_hscode = require('./elasticsearch/Hscode');
// END CONTROLLER ELASTICSEARCH

const controller = {};

// controller.sendEmail = sendEmail;
controller.documentLayanan = documentLayanan;
controller.dokumen = dokumen;
controller.masterListBarang = masterListBarang;
controller.masterList = masterList;

// CONTROLLER REFRENSI
controller.satuan = satuan;
controller.kota = kota;
controller.negara = negara;
controller.pelabuhan = pelabuhan;
controller.provinsi = provinsi;
controller.perijinan = perijinan;
controller.status_perijinan = status_perijinan;
controller.ga = ga;
controller.hscode = hscode;
controller.incoterm = incoterm;
controller.jenis_dokumen = jenis_dokumen;
controller.jenis_permohonan = jenis_permohonan;
controller.valuta = valuta;
controller.daerah = daerah;
controller.listHs = listHs;
controller.kurs = kurs;
controller.jenisBarang = jenisBarang;
controller.kek = kek;
controller.layanan = layanan;
// END CONTROLLER REFRENSI

// CONTROLLER BERITA
controller.berita = berita;
// END CONTROLLER BERITA

// CONTROLLER ELASTICSEARCH
controller.es_hscode = es_hscode;
// END CONTROLLER ELASTICSEARCH

//CONTROLLER ACL
controller.menu = menu;
controller.login = login;
// END CONTROLLER ACL

controller.M_DetailBarangUpload = M_DetailBarangUpload;
controller.M_DetailBarangForm = M_DetailBarangForm;
controller.updateDetailDokumen = updateDetailDokumen;
controller.M_DetailBarangPelabuhan = M_DetailBarangPelabuhan;
controller.M_Korespodensi = M_Korespodensi;
controller.M_LokProyek = M_LokProyek;
controller.M_WilayahKerja = M_WilayahKerja;
controller.M_Pelb = M_Pelb;
controller.pengajuanMasterlist = pengajuanMasterlist;
controller.pg = pg;
controller.generate = generate;
controller.log = log;

module.exports = controller;
