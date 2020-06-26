const model = require('../config/model/index');
const { Op } = require('sequelize');
const queue = require("../middlewares/amqp_lib.js");
const helpers = {};


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

	// console.log(rs);
	




}

module.exports = helpers;