const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
// const fileUpload = require('express-fileupload');

const db = require('./config/database/mysql');
const cors = require('cors');

const link = require('./routes/routes');
const app = express();
const route = express.Router();
app.use(helmet());
app.use(cors());
// app.use(fileUpload());


app.use(require('sanitize').middleware);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, 'public')));

// ROUTER REFRENSI
// app.use(fileUpload());
app.use('/api/satuan', link.satuanRouter);
app.use('/api/kota', link.kotaRouter);
app.use('/api/negara', link.negaraRouter);
app.use('/api/pelabuhan', link.pelabuhanRouter);
app.use('/api/provinsi', link.provinsiRouter);
app.use('/api/perijinan', link.perijinanRouter);
app.use('/api/status_perijinan', link.statusperijinanRouter);
app.use('/api/ga', link.gaRouter);
app.use('/api/hscode', link.hscodeRouter);
app.use('/api/incoterm', link.incotermRouter);
app.use('/api/jenis_dokumen', link.jenisDokumenRouter);
app.use('/api/jenis_permohonan', link.jenisPermohonanRouter);
app.use('/api/valuta', link.valutaRouter);
app.use('/api/daerah', link.daerah);
app.use('/api/listHs', link.listHs);
app.use('/api/kurs', link.kursRouter);
app.use('/api/jenisBarang', link.jenisBarang);
app.use('/api/kek', link.kek);
app.use('/api/jenisLayanan', link.layanan);
app.use('/api/statusProses', link.statusProses);
//END ROUTER REFRENSI

// ROUTER BERITA
app.use('/api/berita', link.beritaRouter);
// END ROUTER BERITA

// ROUTER ELASTICSEARCH
app.use('/api/hscode_mobile', link.esHscodeRouter);
// END ROUTER ELASTICSEARCH

// app.use('/api', link.refrensiRouter);


//Masterlist 
app.use('/api/masterList/DetailBarangForm', link.masterlistDetailBarangForm);
app.use('/api/masterList/DetailBarangUpload', link.masterlistDetailBarangUpload);
app.use('/api/masterlist/barangPelabuhan', link.masterlistBarangPelabuhan);
app.use('/api/masterlist/korespodensi', link.masterlistKorespodensi);
app.use('/api/masterlist/lokasiProyek', link.masterlistLokasiProyek);
app.use('/api/masterlist/Pelb', link.masterlistPelb);
app.use('/api/masterlist/wilayahKerja', link.masterlistWilayahKerja);
app.use('/api/masterlist', link.masterList);
app.use('/api/nib', link.fake);
app.use('/api/masterlist/pengajuanMasterlist', link.pengajuanMasterlist);
app.use('/api/document', link.documentLayanan);
app.use('/api/masterList/HeaderBarang', link.masterBarang);
app.use('/api/masterlist/dokumen', link.dokumen);
// app.use('/generate', link.generate);
// app.use('/global', link.globalRoute);

/*start acl*/
app.use('/api/menu', link.menu);
app.use('/api/login', link.login);
/*end acl*/

/*paggination*/
app.use('/api/pg', link.pgRoute);

// Format Excel & Send Notification
app.use('/api/tamplateExcel', link.tamplateExcel);
app.use('/api/masterlist/updateDetailDokumen', link.updateDokumenBarang);
// End Format Excel & Send Notification

app.use('/api/log', link.log);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

app.get('/', function (req, res, next) {
  res.json({ message: 'Success' })
})


app.use((req, res, next) => {
  res.status(404).send({
    code: '02',
    error: 'Not Found'
  })
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
