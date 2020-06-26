const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
	const format_excel = 'assets//upload//tamplateExcel//tamplateExcel.xlsx';
	res.status(200).json({
		code: '01',
		message: 'tamplateExcel',
		data: format_excel
	});
});

module.exports = router;