const model = require('../../config/model/index');
const { Op } = require('sequelize');
const controller = {};

controller.getAllMenu = async function (req, res, next) {

	if (req.query.user_role == "admin_pu") {
    // Admin PU
    let dataArray = [
      {
        name: 'Beranda Saya',
        url: '/dashboard',
        icon: 'fa fa-home',
        badge: {
          variant: 'info',
        },
      },
      {
        name: 'Layanan Informasi',
        url: '/layanan-informasi',
        icon: 'fa fa-database',
      },
      {
        name: 'Layanan Transaksi',
        url: '/layanan-transaksi',
        icon: 'fa fa-dollar',
      },
      {
        name: 'Layanan Pelaporan',
        url: '/layanan-pelaporan',
        icon: 'fa fa-file-text-o',
      },
    ];
  
    res.json({
      items: dataArray,
    });
  } else {
    // Admin PU
    let dataArray = [
      {
        name: 'Beranda Saya',
        url: '/dashboard',
        icon: 'fa fa-home',
        badge: {
          variant: 'info',
        },
      },
      {
        name: 'Layanan Informasi',
        url: '/layanan-informasi',
        icon: 'fa fa-database',
      },
      {
        name: 'Layanan Transaksi',
        url: '/layanan-transaksi',
        icon: 'fa fa-dollar',
      },
      {
        name: 'Layanan Pelaporan',
        url: '/layanan-pelaporan',
        icon: 'fa fa-file-text-o',
      },
      {
        name: "Form Wizard",
        url: "/formwizard",
        icon: "icon-note",
      },
      {
        name: "UI5 Icon",
        url: "/ui5icon",
        icon: "icon-emotsmile",
      },
    ];
  
    res.json({
      items: dataArray,
    });
  }
			
}

controller.getLogin = async function (req, res, next) {
	
	if (req.body.email == "lnsw@gmail.com") {
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
    
    res.json({
      data: dataArray,
    });
  } else {
    // Admin PU
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

    res.json({
      data: dataArray,
    });
  }
			
}


module.exports = controller;