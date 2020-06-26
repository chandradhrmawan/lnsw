const model = require('../../config/model/index');
const generateCont = require('../masterlist/generateCodeController');
const { Op } = require('sequelize');
const moment = require('moment');
const invNum = require('invoice-number');
const controller = {};
const path = require('path');
const randomstring = require('randomstring');
const {validationResult} = require('express-validator');
const converter = require('hex2dec');
const stripHexPrefix = require('strip-hex-prefix');
const helpers    = require('../../helpers/global_helper');

controller.getAll = async function (req, res, next) {
    let data_masterlist = await model.masterList.findAll()
        .then((result) => {
            if (result.length > 0) {
                res.status(200).json({
                    code: '01',
                    message: 'Sukses',
                    data: result
                });
            } else {
                res.status(404).json({
                    code: '01',
                    message: 'Tidak Ada Data'
                });
            }
        }).catch((err) => {
            res.status(400).json({
                code: '02',
                message: err
            });
        })
};

controller.generateKode = async function (req, res, next) {
    console.log('sini');
    const ur = req.params.keyword;
    const kode = await generateCont.generate(ur);
    console.log(kode);
};

controller.get = async function (req, res, next) {
    const id_permohonan = req.params.search;
    

    const result = {}
    result.pelaku_usaha = await model.masterList.findOne({
        where:{
            id_permohonan:id_permohonan
        }
    });

    result.korespondensi = await model.M_Korespodensi.findOne({
        where:{
            id_permohonan:id_permohonan
        }
    });

    result.wilayah_kerja = await model.M_WilayahKerja.findOne({
        where:{
            id_permohonan:id_permohonan
        }
    });

    result.lokasi_proyek = await model.M_LokasiProyek.findOne({
        where:{
            id_permohonan:id_permohonan
        }
    });

    res.status(200).json({
        code: '01',
        message: 'Sukses',
        data: result
    });


    /*await model.masterList.findAll({
        where: {
            [Op.or]: [{
                id_permohonan: {
                    [Op.iLike]: '%' + search + '%'
                }
            }]
        }
    }).then((result) => {
        if (result.length > 0) {
            res.status(200).json({
                code: '01',
                message: 'Sukses',
                data: result
            });
        } else {
            res.status(404).json({
                code: '01',
                message: 'Tidak Ada Data'
            });
        }
    }).catch((err) => {
        res.status(400).json({
            code: '02',
            message: err
        })
    });*/
};


controller.post = async function (req, res) {

    const errInput = validationResult(req);
    let log_param = {
        payload:[]
    }
    if(errInput.isEmpty()){
        let id_permohonan = await generateCont.generate(req.body.kode_probis.toUpperCase());

        let post_data = {
            id_permohonan         : id_permohonan,
            id_permohonan_parent  : id_permohonan,
            tgl_pengajuan         : Date.now(),
            nib                   : req.body.no_nib_pu,
            nama_perusahaan       : req.body.nama_perusahaan_pu,
            nama_penanggung_jawab : req.body.nama_pu,
            email                 : req.body.email_pu,
            kd_proses             : 1
        }

        await model.masterList.create(post_data).then((result) => 
        {   
            /*send data to log*/
            log_param.id_permohonan = result.dataValues.id_permohonan;
            log_param.action_type   = "Insert";
            log_param.kd_layanan    = "1";
            log_param.username      = req.body.nama_pu;
            log_param.payload.push(post_data);

            /*send data log and email*/
            let log_rs = helpers.createLog(log_param);
            let send_email = helpers.sendEmail(result.dataValues.id_permohonan);
            /*end send data to log and email*/

            res.status(200).json({
                code    : '01',
                message : 'Masterlist Berhasil Ditambah',
                data    : result
            })
        }).catch((err) => {
            res.status(404).json({
                code    : '02',
                message : err
            })
        });
    }else{
        res.status(404).json({
            code: '02',
            message: errInput
        });
    }
};

controller.updateMasterList = async(req,res,next) => {
    
    try{

        let rs1 = req.body.pelaku_usaha[0];
        let rs2 = req.body.penanggung_jawab[0];
        let rs3 = req.body.korespondensi[0];
        let rs4 = req.body.data_pengajuan[0];

        let rs5 = req.body.wilayah_kerja[0];
        let rs6 = req.body.lokasi_proyek[0];


        let ret = {};
        
        ret.pelaku_usaha = {
            nib                     : rs1.nib,
            nama_perusahaan         : rs1.nama_perseroan,
            kd_kota                 : rs1.kota,
            rt_rw_perusahaan        : rs1.rt_rw,
            alamat_perusahaan       : rs1.alamat,
            // kd_pos                  : rs1.kode_pos,
            no_telepon              : rs1.no_telp,
            email                   : rs1.email,
            no_fax                  : rs1.fax,
            nama_penanggung_jawab   : rs2.nama,
            jbt_penangungjawab      : rs2.jabatan,
            tgl_pengajuan           : rs4.tanggal_pengajuan,
            npwp                    : rs4.nomor_identitas,
            tujuan_kegiatan         : rs4.tujuan_kegiatan,
            kd_kek                  : rs4.kode_kek,
            kd_kppbc                : rs4.kode_kppbc,
            kelurahan               : rs4.kelurahan,
            kd_pos                  : rs4.kode_pos
        }

        console.log(ret.pelaku_usaha);

        ret.korespondensi = {
            id_permohonan           : req.params.id_permohonan,
            tipe_korespodensi       : rs3.tipe_korespondensi,
            nama_korespodensi       : rs3.nama,
            jbt_korespodensi        : rs3.jabatan,
            alamat_korespodensi     : rs3.alamat,
            jenis_identitas         : rs3.jenis_identitas,
            nomor_identias          : rs3.nomor_identitas,
            no_telepon              : rs3.no_telp,
            no_hp                   : rs3.no_telp,
            email                   : rs3.email
        }

        ret.wilayah_kerja = {
            id_permohonan           : req.params.id_permohonan,
            rt_rw                   : rs5.rt_rw_proyek,
            daerah_kode             : rs5.kelurahan,
            kd_kota                 : rs5.kd_kota,
            // kode_pos                : rs5.kode_pos,
            alamat                  : rs5.alamat
        }

        ret.lokasi_proyek = {
            id_permohonan           : req.params.id_permohonan,
            rt_rw_proyek            : rs6.rt_rw_proyek,
            kelurahan               : rs6.kelurahan,
            kd_kota                 : rs6.kd_kota,
            kode_pos                : rs6.kode_pos,
            alamat                  : rs6.alamat
        }


        let master = await model.masterList.update(ret.pelaku_usaha,{
            where:{
                id_permohonan : req.params.id_permohonan
            }
        });

        let korespodensi  = await model.M_Korespodensi.create(ret.korespondensi);
        let wilayah_kerja = await model.M_WilayahKerja.create(ret.wilayah_kerja);
        let lokasi_proyek = await model.M_LokasiProyek.create(ret.lokasi_proyek);


        res.status(200).json({
            code     : '01',
            message  : 'Success',
            response : ret
        })

    }catch(err){
        res.status(200).json({
            code     : '02',
            message  : 'error',
            data     : {}
        })
    }
}


controller.update = async function (req, res, next) {
    await jenisSatuanModel.update({
        id_pemohonan_parent: req.body.PermohonanParent,
        kd_jenis_permohonan: req.body.kdJenisPermohonan,
        no_keputusan: req.body.noKeputusan,
        no_keputusan_parent: req.body.noKeputusanParent,
        tgl_keputusan: req.body.tglKeputusan,
        tgl_akhir_berlaku: req.body.tglAkhirBerlaku,
        nib: req.body.nib,
        npwp: req.body.npwp,
        nama_perusahaan: req.body.namaPerusahaan,
        alamat_perusahaan: req.body.alamatPerusahaan,
        rt_rw_perusahaan: req.body.rtRwPerusahaan,
        kelurahan: req.body.kelurahan,
        kd_kota: req.body.kdKota,
        kd_pos: req.body.kdPos,
        no_telepon: req.body.noTelepon,
        no_fax: req.body.noFax,
        email: req.body.email,
        nama_penanggung_jawab: req.body.namaPenanggungJawab,
        jbt_penanggungjawab: req.body.jbtPenanggungjawab,
        kd_kek: req.body.kdKek,
        kd_kppbc: req.body.kdKppbc,
        kd_kota_pengajuan: req.body.kdKotaPengajuan,
        kd_status_perijinan: req.body.kdStatusPerijinan,
        tujuan_kegiatan: req.body.tujuanKegiatan,
        id_wilayah_kerja: req.body.idWilayahKerja
    }, {
        where: {
            id_permohonan: req.params.id_permohonan
        }
    }).then(result => {
        res.status(200).json({
            code: '01',
            message: 'Jenis Satuan berhasil Diubah',
        })
    }).catch(err => {
        res.status(400).json({
            code: '02',
            message: 'Error'
        })
    });
}

controller.hex = async function (req, res, next) {
    //Contoh pemanggilan Generate
    const permohonanId = await generateCont.generate('KEK');
    const BarangInvoice = await generateCont.barangGenerate();
    console.log(permohonanId, BarangInvoice);
}

const generateCode = async function (ur_probis) {
    const ur = 'Masterlist ' + ur_probis;
    const kode = await getKodeProbis(ur);
    const code = (kode[0].kode_probis);
    let date = moment(Date.now()).format('YYYYMMDD');
    let generate = code + date;
    const record = await model.masterList.findAll({
        attributes: ['id_permohonan'],
        where: {
            id_permohonan: {
                [Op.iLike]: generate + '%'
            }
        }
    }).then(function (result) {
        if (result.length > 0) {
            invoice = JSON.parse(JSON.stringify(result));
            hasil = invoice[0].id_permohonan;
            return invNum.next(hasil);
        } else {
            return generate + '00001';
        }

    });
    return record;

}


function getKodeProbis(master) {
    return model.probis
        .findAll({
            attributes: [
                'kode_probis'],
            where: {
                ur_probis: master,
            }
        })
        .then(function (result) {
            pars = JSON.parse(JSON.stringify(result))
            return pars;

        });
}

function findField(tanggal, kd_probis) {
    const record = model.gen.findAll({
        attributes: ['last_number'],
        where: {
            [Op.and]: [{
                tgl: tanggal
            }, {
                kode_probis: kd_probis
            }]
        }
    }).then(function (result) {
        if (result.length > 0) {
            invoice = JSON.parse(JSON.stringify(result));
            hasil = invoice[0].last_number;
            valNext = invNum.next(hasil);
            const data = model.gen.update({
                last_number: valNext
            }, {
                where: {
                    tgl: tanggal,
                    kode_probis: kd_probis
                }
            });
            if (data) {
                return valNext;
            } else {
                return 'Fail';
            }

        } else {
            const data = model.gen.create({
                tgl: tanggal,
                kode_probis: kd_probis,
                last_number: '0001'
            });
            if (data) {
                return '0001';
            } else {
                return 'Fail';
            }

        }

    });
    return record;
}
function BarangInvoice() {
    let rndm = randomstring.generate({
        length: 4,
        charset: 'alphabetic'
    });
    let now = moment(Date.now()).format('YYYYMMDDhhmm');
    let invoice = rndm + now;
    return invoice;

}

function idPermohonan() {
    let rndm = randomstring.generate({
        length: 4,
        charset: 'alphabetic'
    });
    let now = moment(Date.now()).format('YYYYMMDDhhmm');
    let id_permohonan = rndm + now;
    return id_permohonan;
}

module.exports = controller;