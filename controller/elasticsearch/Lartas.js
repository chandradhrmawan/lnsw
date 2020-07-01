var client = require("../../config/elasticsearch/elasticsearch");
var express = require("express");
var app = express();
const controller = {};
const path = require("path");

controller.get = async function (req, res) {
	client
		.search({
			index: "lartas",
			type: "_doc",
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
				if (resp.hits.total.value > 0) {
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

module.exports = controller;
