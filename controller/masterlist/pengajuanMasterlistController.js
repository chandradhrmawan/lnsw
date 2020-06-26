const model = require('../../config/model/index');
const { Op } = require('sequelize');
const controller = {};
const path = require('path');
const moment = require('moment');
const fs = require('fs');
'use strict';

controller.test =  async function (req, res, next){

	let {file} = req.body;

	console.log(file);
	
	let data = 'c3RhY2thYnVzZS5jb20=';
	let buff = new Buffer(data, 'base64');
	let text = buff.toString('ascii');

	console.log('"' + data + '" converted from Base64 to ASCII is "' + text + '"');

	// convert image to base64 encoded string
	var base64str = base64_decode(file);
	console.log(base64str);
	// convert base64 string back to image 
	base64_decode(base64str, 'copy.jpg');

	res.status(201).json({
        'status': 'ok',
        'messages': 'ok',
        'data': 'ok',
    })
}

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

// function to create file from base64 encoded string
function base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    // write buffer to file
    fs.writeFileSync(file, bitmap);
    console.log('******** File created from base64 encoded string ********');
}

controller.getMasterlistHeader =  async function (req, res, next){

	await model.masterList.create(parsedObj.masterList[0]);

}

controller.postDataForm =  async function (req, res, next){
	let json_data = req.body;

	var stringified = JSON.stringify(json_data);
	var parsedObj 	= JSON.parse(stringified);


	var status 	= "OK";
	var message = "Pengajuan Masterlist Berhasil Di "+parsedObj.action;

	const response = {};

	try {

		if(parsedObj.action == 'insert'){


			response.masterlist 	= await model.masterList.create(parsedObj.masterList[0])
			if(response.masterlist){
				response.headerBarang  = await model.MasterlistBarang.create(parsedObj.header_masterlist_barang[0])
				if(response.headerBarang){
					let counter_brg = Object.keys(parsedObj.detail_masterlist_barang).length-1;
					for (var i = 0; i <= counter_brg; i++) {
						response.detailBarang  = await model.M_DetailBarang.create(parsedObj.detail_masterlist_barang[i])
					}

					let counter_brg_pel = Object.keys(parsedObj.detailbrg_pelabuhan).length-1;
					for (var i = 0; i <= counter_brg_pel; i++) {
						response.detailbrg_pelabuhan = await model.M_DetailBarangPelabuhan.create(parsedObj.detailbrg_pelabuhan[i])
					}
					
					response.wilayah_kerja    = await model.M_WilayahKerja.create(parsedObj.wilayah_kerja[0])
					response.peldb_masterlist = await model.M_Pelb.create(parsedObj.peldb_masterlist[0])
					response.dokumen   		  = await model.dokumen.create(parsedObj.dokumen[0])
					response.korespodensi 	  = await model.M_Korespodensi.create(parsedObj.korespondensi[0])
					response.lokasi_proyek 	  = await model.M_LokasiProyek.create(parsedObj.lokasi_proyek[0])
				}
			}
		

		}else if(parsedObj.action == 'update'){
			response.masterlistUpdate = await model.masterList.update(parsedObj.masterList[0],{
				where: {
					id_permohonan: parsedObj.masterList[0].id_permohonan
				}
			});

			response.headerBarangUpdate = await model.MasterlistBarang.update(parsedObj.header_masterlist_barang[0],{
				where:{
					id_barang:parsedObj.header_masterlist_barang[0].id_barang,
					id_permohonan:parsedObj.masterList[0].id_permohonan
				}
			});

			//update detail td_detail_masterlistbarang
			let counter_brg_up = Object.keys(parsedObj.detail_masterlist_barang).length-1;
			for (var j = 0; j <= counter_brg_up; j++) {
				response.detailBarangUpdate  = await model.M_DetailBarang.update(parsedObj.detail_masterlist_barang[j],{
					where:{
						id_detailmasterlist_barang:parsedObj.detail_masterlist_barang[j].id_detailmasterlist_barang,
						id_barang:parsedObj.header_masterlist_barang[0].id_barang
					}
				})

					/*update detail td_detailbrg_pelabuhan*/
					let counter_brg_pel_up = Object.keys(parsedObj.detailbrg_pelabuhan).length-1;
					for (var i = 0; i <= counter_brg_pel_up; i++) {
						response.detailbrg_pelabuhanUpdate = await model.M_DetailBarangPelabuhan.update(parsedObj.detailbrg_pelabuhan[i],{
							where:{
								id_detailbrg_pelabuhan:parsedObj.detailbrg_pelabuhan[i].id_detailbrg_pelabuhan,
								id_detailmasterlist_barang:parsedObj.detail_masterlist_barang[j].id_detailmasterlist_barang
							}
						})
					}
					/*end update td_detailbrg_pel*/
			}

			response.wilayah_kerjaUpdate      = await model.M_WilayahKerja.update(parsedObj.wilayah_kerja[0],{
				where:{
					id_wilayah_kerja:parsedObj.wilayah_kerja[0].id_wilayah_kerja,
					id_permohonan:parsedObj.masterList[0].id_permohonan
				}
			});

			response.peldb_masterlistUpdate   = await model.M_Pelb.update(parsedObj.peldb_masterlist[0],{
				where:{
					id_pelb_masterlist:parsedObj.peldb_masterlist[0].id_pelb_masterlist,
					id_permohonan:parsedObj.masterList[0].id_permohonan
				}
			});

			response.dokumenUpdate   		  = await model.dokumen.update(parsedObj.dokumen[0],{
				where:{
					id_dokumen:parsedObj.dokumen[0].id_dokumen,
					id_permohonan:parsedObj.masterList[0].id_permohonan
				}
			});

			response.korespodensiUpdate 	  = await model.M_Korespodensi.update(parsedObj.korespondensi[0],{
				where:{
					id_korespodensi:parsedObj.korespondensi[0].id_korespodensi,
					id_permohonan:parsedObj.masterList[0].id_permohonan
				}
			});

			response.lokasi_proyekUpdate 	  = await model.M_LokasiProyek.update(parsedObj.lokasi_proyek[0],{
				where:{
					id_lok_proyek:parsedObj.lokasi_proyek[0].id_lok_proyek,
					id_permohonan:parsedObj.masterList[0].id_permohonan
				}
			});
		}else if(parsedObj.action == 'delete'){

		}	


		if (response) {
	        res.status(200).json({
	        	'code':'01',
	            'status': status,
	            'messages': message,
	            'data': response,
	        })
	    }


	}catch(err) {
        res.status(400).json({
        	'code':'02',
            'status': 'ERROR',
            'messages': err.message,
            'data': response,
        })
    }
}

controller.getAllData = async function(req,res){
	await model.v_masterlist_detail.findAll()
		.then((result)=>{
			res.status(200).json({
				code: '01',
				status: 'Sukses',
				data: result
			});
		}).catch((err)=>{
			res.status(404).json({
				code: '02',
				status: 'Gagal',
				message: err,
			});
		})
}
module.exports = controller;