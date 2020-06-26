const queue = require("../../middlewares/amqp_lib.js");
const controller = {};

controller.sendEmail = async function(req,res){
	const {} = req.body;
	const message = {
					  "attributes": {
					    "userId": "john.doe",
					    "fullName": "John Doe",
					    "tokenClient": "kaskd",
					    "phoneNumber": "085",
					    "mailTo": "tst"
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
					      "subject": "Pemberitahuan Registrasi Berhasil",
					      "text": "silahkan bla bla bla"
					    }
					  }
					};
	queue.publishExchange('lnsw.e.notice', 'direct', 'notice.email', JSON.stringify(message));

}
module.exports = controller;
