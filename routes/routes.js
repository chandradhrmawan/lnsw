const satuanRouter = require('./refrensi/satuan');
const kotaRouter = require('./refrensi/kota');
const negaraRouter = require('./refrensi/negara');
const pelabuhanRouter = require('./refrensi/pelabuhan');
const provinsiRouter = require('./refrensi/provinsi');
const perijinanRouter = require('./refrensi/perijinan');
const statusperijinanRouter = require('./refrensi/status_perijinan');
const gaRouter = require('./refrensi/ga');
const hscodeRouter = require('./refrensi/hscode');
const esHscodeRouter = require('./elasticsearch/hscode');
const incotermRouter = require('./refrensi/incoterm');
const jenisDokumenRouter = require('./refrensi/jenis_dokumen');
const jenisPermohonanRouter = require('./refrensi/jenis_permohonan');
const valutaRouter = require('./refrensi/valuta');
const kursRouter = require('./refrensi/kurs');
const layanan = require('./refrensi/layanan');
const autocomplete = require('./autocollection');
const documentLayanan = require('./documentLayanan/documentLayanan');
// const globalRoute = require('./global/web');
const daerahRoute = require('./refrensi/daerah');
// const generate = require('./masterlist/generate');
// const valuta = require('./autocomplete/valuta');
const fake = require('./fake/fake');
const masterlistDetailBarangUpload = require('./masterlist/masterlistDetailBarangUpload');
const masterlistDetailBarangForm = require('./masterlist/masterlistDetailBarangForm');
const updateDokumenBarang = require('./masterlist/updateDokumenBarang');
const masterlistKorespodensi = require('./masterlist/masterlistKorespoden');
const masterlistBarangPelabuhan = require('./masterlist/masterlistBarangPelabuhan');
const masterlistLokasiProyek = require('./masterlist/masterlistLokasiProyek');
const masterlistPelb = require('./masterlist/masterlistPelb');
const masterlistWilayahKerja = require('./masterlist/masterlistWilayahKerja');
const refrensi = require('./refrensi');
const MasterlistBarang = require('./masterlist/masterListBarang');
const Dokumen = require('./masterlist/dokumen');
const masterList = require('./masterlist/masterList');
const pengajuanMasterlist = require('./masterlist/pengajuanMasterlist');
const listHs = require('./refrensi/listhscode');
const menu = require('./acl/menu');
const login = require('./acl/login');
const pg = require('./pg/pg');
const tamplateExcel = require('./formatExcel/formatExcel');
const beritaRouter = require('./berita/berita');
const jenisBarang = require('./refrensi/jenisBarang');
const log = require('./log/log');
const kek = require('./refrensi/kek');
const statusProses = require('./refrensi/statusProses');

module.exports = {
    satuanRouter: satuanRouter,
    kotaRouter: kotaRouter,
    negaraRouter: negaraRouter,
    pelabuhanRouter: pelabuhanRouter,
    provinsiRouter: provinsiRouter,
    perijinanRouter: perijinanRouter,
    statusperijinanRouter: statusperijinanRouter,
    gaRouter: gaRouter,
    hscodeRouter: hscodeRouter,
    esHscodeRouter: esHscodeRouter,
    incotermRouter: incotermRouter,
    jenisDokumenRouter: jenisDokumenRouter,
    jenisPermohonanRouter: jenisPermohonanRouter,
    valutaRouter: valutaRouter,
    kursRouter: kursRouter,
    autoCollectionRouter: autocomplete,
    documentLayanan: documentLayanan,
    fake: fake,
    refrensiRouter: refrensi,
    masterlistDetailBarangUpload: masterlistDetailBarangUpload,
    masterlistDetailBarangForm: masterlistDetailBarangForm,
    updateDokumenBarang: updateDokumenBarang,
    masterlistBarangPelabuhan: masterlistBarangPelabuhan,
    masterlistKorespodensi: masterlistKorespodensi,
    masterlistLokasiProyek: masterlistLokasiProyek,
    masterlistPelb: masterlistPelb,
    masterlistWilayahKerja: masterlistWilayahKerja,
    listHs: listHs,
    // generate: generate,
    // valutaRouter: valuta
    masterBarang: MasterlistBarang,
    dokumen: Dokumen,
    daerah: daerahRoute,
    masterList: masterList,
    pengajuanMasterlist: pengajuanMasterlist,
    menu: menu,
    login: login,
    pgRoute: pg,
    tamplateExcel: tamplateExcel,
    beritaRouter: beritaRouter,
    jenisBarang: jenisBarang,
    log: log,
    kek: kek,
    layanan:layanan,
    statusProses:statusProses
}