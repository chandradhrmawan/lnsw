var client = require("../../config/elasticsearch/elasticsearch");
var express = require('express');
var app = express();
const controller = {};
const path = require('path'); // Require library to help with filepaths

// Homepage route
// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname+'/index.html'));
// });

// Route to search for Articles by title
controller.get = async function (req, res) {
    // Access title like this: req.params.title

    /* Query using slop to allow for unexact matches */
    client.search({
    index: 'hs_code',
    type: 'regulation',
    body: {
      "query": {  
        "match": {
            // "title": "mesin"
          "title": { query: req.query.title }
        }
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