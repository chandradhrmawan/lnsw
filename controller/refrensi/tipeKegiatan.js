const controller = {};
const model = require('../../config/model/index');

controller.getKegiatan = async function(req, res){
	await model.tipeKegiatan.findAll().then((result)=>{
		res.status(200).json({
			code: '01',
			message: 'Sukses',
			data: result
		});
	});
}
module.exports = controller;