var Sequelize = require('sequelize');
var db = new Sequelize("insw_dev", "custom", "custom", {
	dialect: "mysql",
	host: "10.8.3.198"
});

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// const mysql = require('mysql');
// const db = mysql.createConnection({
//   host: '10.8.3.198',
//   user: 'custom',
//   password: 'custom',
//   database: 'insw_dev'
// });

// db.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to MySQL Server!');
// });

module.exports = db;