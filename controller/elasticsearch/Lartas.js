var client = require("../../config/elasticsearch/elasticsearch");
var express = require('express');
var app = express();
const controller = {};
const path = require('path'); // Require library to help with filepaths

// Route to search for Articles by title
controller.get = async function (req, res) {
    // Access title like this: req.params.title

    /* Query using slop to allow for unexact matches */
    client.search({
    index: 'lartas',
    type: '_doc',
    body: {
      "query": {  
        "match_all": {}
      }
    }
   
    }).then(function(resp) {
        console.log("Successful query! Here is the response:", resp);
        // res.send(resp);
        res.status(200).json({
            code: '01',
            message: 'Sukses',
            data: resp.hits.hits
        });
    }, function(err) {
        console.trace(err.message);
        res.send(err.message);
    });
  };

module.exports = controller;