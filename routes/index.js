var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Map = require('../models/Maps');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile('./views/index.html');
});

router.get('/maplayer.geojson', function (req, res, next) {
    Map.find({}, function(err, maps) {
        if(err) {
            throw err;
        }
        else {
          var tempmaps = JSON.stringify(maps);
          var jsonmaps = tempmaps.substring(1, tempmaps.length-1);
          var map = JSON.parse(jsonmaps);
          res.json(map);
        }
    });
});

module.exports = router;
