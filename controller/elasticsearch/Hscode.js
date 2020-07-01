var client = require("../../config/elasticsearch/elasticsearch");
var express = require("express");
var app = express();
const controller = {};
const path = require("path");

controller.get = async function (req, res) {
	client
		.search({
			index: "hs_code",
			type: "regulation",
			body: {
				query: {
					query_string: {
						query: req.query.q,
					},
				},
			},
		})
		.then(
			function (resp) {
				// console.log("Successful query! Here is the response:", resp);
				if (resp.hits.total.value > 0) {
					// res.send(resp);
					res.status(200).json({
						code: "01",
						message: "Sukses",
						data: resp.hits.hits,
					});
				} else {
					res.status(404).json({
						code: "01",
						message: "Tidak Ada Data",
					});
				}
			},
			function (err) {
				console.trace(err.message);
				res.send(err.message);
			}
		);
};

// Start listening for requests on port 3000
// app.listen(3000, function () {
//   console.log('App listening for requests...');
// });

// var elasticsearch = require('elasticsearch');
// var client = new elasticsearch.Client({
//    hosts: [ 'http://elastic:insw2020@10.8.3.49:9200']
// });

// client.search({
//     index: 'hs_code',
//     type: 'regulation',
//     body: {
//         query: {
//             match: {
//                 "title": "mesin"
//             }
//         }
//     }
// }).then(function(resp) {
//     console.log(resp);
// }, function(err) {
//     console.trace(err.message);
// });

module.exports = controller;
