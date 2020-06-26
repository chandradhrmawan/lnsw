const model = require('../../config/model/index');
const { Op } = require('sequelize');
const controller = {};

controller.postLogin = async function (req, res, next) {
	
	if (req.body.email.toLowerCase() == "lnsw@gmail.com" || req.body.email.toLowerCase() == "lnsw@lnsw.com") {
    // Admin PU
    let dataArray = [
      {
        access_token: "kgpht7Di2ADGblQx3wlQWPrfmKWZTPnY",
        roles: "user",
        user_role: "admin_pu",
        token_type: "bearer",
        username: "user",
        id_user: 1,
        default_home: "/dashboard",
      },
    ];

    res.status(200).json({
        code: '01',
        message: 'Success',
        data:dataArray
    });

  }else if(req.body.email.toLowerCase() == "admin_kek@gmail.com" || req.body.email.toLowerCase() == "admin_kek@lnsw.com"){
    // Admin Kek
    let dataArray = [
      {
        access_token: "kgpht7Di2ADGblQx3wlQWPrfmKWZTPnY",
        roles: "user",
        user_role: "admin_kek",
        token_type: "bearer",
        username: "user",
        id_user: 1,
        default_home: "/dashboard",
      },
    ];

    res.status(200).json({
        code: '01',
        message: 'Success',
        data:dataArray
    });

  }else {
    
    res.status(400).json({
      code: '02',
      message: 'Password / Email Salah',
      data: {},
    })
			
}
}


module.exports = controller;