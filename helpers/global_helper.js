const model = require('../config/model/index');
const { Op } = require('sequelize');
const queue = require("../middlewares/amqp_lib.js");
const helpers = {};
const path = require('path');
const fs = require('fs');
const chmodr = require('chmodr');
const mkdirp = require('mkdirp');


helpers.createLog = function (param) {

	try{
		let data_log = [];
		data_log['date_action'] = Date.now();
		data_log['is_read'] 	= 0;
		data_log['payload'] 	= JSON.stringify(param.payload[0]);
		for(var key in param){
			if(key == 'payload'){
				continue;
			}else{
				data_log[key] = param[key];
			}
	  	} 
	  	data_log = Object.assign({}, data_log);
	  	const save_log = model.tb_log.create(data_log)
	  	return
    }catch(err) {
    	console.log(err);
    }
}

helpers.sendEmail = function(id_permohonan){
	
	let rs = model.masterList.findOne({
		where:{
			id_permohonan:id_permohonan
		}
	}).then((ress) =>{
		console.log(ress);
		let email = ress.dataValues.email;
		const message = {
					  "attributes": {
					    "userId": "john.doe",
					    "fullName": "John Doe",
					    "tokenClient": "kaskd",
					    "phoneNumber": "085",
					    "mailTo": email
					  },
					  "contents": {
					    "data:": {
					      "uri": "/login/success",
					      "moduleName": "Registration",
					      "transactionId": "K/L0001"
					    },
					    "message": {
					      "type": "Notification",
					      "status": "Success",
					      "subject": "Berhasil Insert Masterilist",
					      "text": "silahkan bla bla bla"
					    }
					  }
					};
		queue.publishExchange('lnsw.e.notice', 'direct', 'notice.email', JSON.stringify(message));
		console.log(message);
		return true;

	}).catch((err) => {
		console.log(err);
	})
}

helpers.uploadData = async (param) => {
	/*
	set parameter to upload
		1.id_permohonan
		2.kd_layanan
		3.file_upload
	*/
	const ress = {};
	let id_permohonan = param.id_permohonan;
    let file_name  	  = Date.now() + '_' +param.file_upload.name;

    let data_masterlist = await model.masterList.findOne({
        where:{
            id_permohonan:id_permohonan
        }
    });
    let nib 	   = data_masterlist.dataValues.nib;
    let kd_layanan = data_masterlist.dataValues.kd_layanan; 
    
    let data_layanan = await model.layanan.findOne({
        where:{
            kd_layanan:kd_layanan
        }
    });

    //define upload path
    let path_upload = data_layanan.dataValues.path_upload+nib+'/';

    //check folder exsist or not
    if (!fs.existsSync(path_upload)){
        fs.mkdir(path_upload, { recursive: true }, (err) => {
            if(err)res.status(400).json({code: '02',message: err});
        });
    }

    //give privilege to upload
    chmodr(path_upload, 0o777, (err) => {
      if (err) console.log(err);
    });

    //concat dir and upload name
    let upload_file = param.file_upload;
    const full_path = path_upload+file_name;

    //do upload file
    upload_file.mv(full_path, (err) => {
        if (err) res.status(400).json({code: '02',message: err});
    });

    //close privilege to read only
    chmodr(path_upload, 0o544, (err) => {
      if (err) console.log(err);
    });

    ress.nib  = nib;
    ress.path = full_path;
    return ress;

}

helpers.deleteFile = async (full_path) => { 

	fs.access(full_path, fs.F_OK, (err) => {
		if (err) {
			// file not exsist
			console.error(err)
		}else{

			//give privilege to remove file
		    chmodr(full_path, 0o777, (err) => {
		      if (err) console.log(err);
		    });

			// do remove file
			fs.unlink(full_path, (err) => {
				if(err)console.log(err);
			});

			//close privilege
		    chmodr(full_path, 0o544, (err) => {
		      if (err) console.log(err);
		    });
		}
		return
	})

}

module.exports = helpers;