const model = require('../../config/model/index');
const { Op } = require('sequelize');
const moment = require('moment');
const invNum = require('invoice-number');
const controller = {};
const randomstring = require('randomstring');
const converter = require('hex2dec');
const stripHexPrefix = require('strip-hex-prefix');

const generateCode = async function (keyword) {
    const ur = keyword;
    const ur_prob = "Masterlist " + ur;
    const numb = await getKodeProbis(ur_prob);
    const code = (numb[0].kode_probis);
    let now = moment(Date.now()).format('YYMMDD');
    let find = await findField(now, code);
    let field = now + find;
    let conver = stripHexPrefix(converter.decToHex(field));
    let invoice = code + conver;
    return invoice;
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
const barangInvoice = async function () {
    let rndm = randomstring.generate({
        length: 4,
        charset: 'alphabetic'
    });
    let now = moment(Date.now()).format('YYYYMMDDhhmm');
    let invoice = rndm + now;
    return invoice;

}


module.exports = {
    generate: generateCode,
    barangGenerate: barangInvoice
};