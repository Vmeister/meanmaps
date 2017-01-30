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
          //var tempmap = JSON.stringify(maps);
          //var jsonmap = tempmap.substring(1, tempmap.length-1);
          //var map = JSON.parse(jsonmap);
          res.json(maps);
        }
    });
});

router.get('/maplayers', function (req, res, next) {
    Map.find({}, function(err, maps) {
        if(err) {
            throw err;
        }
        else {
            var ids = [];
            maps.forEach(function(map) {
                ids.push(map._id);
            })
            res.send(ids);
        }
    })
});

router.get('/maplayers/:id', function (req, res, next) {
    console.log(req.params.id);
    if(req.params.id != null) {
        Map.findById(req.params.id).exec(function (err, map) {
            if (err) {
                throw err;
            }
            else {
                //console.log(map);
                //var tempmap = JSON.stringify(map);
                //var jsonmap = tempmap.substring(1, tempmap.length-1);
                //var map = JSON.parse(jsonmap);
                res.json(map);
            }
        })
    }
});


module.exports = router;