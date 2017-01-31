var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Map = require('../models/Maps');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile('./views/index.html');
});

router.get('/mapnames', function (req, res, next) {
    Map.find({}, function(err, maps) {
        if(err) {
            throw err;
        }
        else {
            var names = [];
            maps.forEach(function(map) {
                names.push(map.documentName);
            })
            res.send(names);
        }
    })
});

router.get('/mapids', function (req, res, next) {
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

router.get('/maps', function (req, res, next) {
    Map.find({}, function(err, maps) {
        if(err) {
            throw err;
        }
        else {
            var ids = [];
            maps.forEach(function(map) {
                ids.push(map._id + " : " + map.documentName);
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
                res.send(404);
            }
            else {
                res.json(map);
            }
        })
    }
});


module.exports = router;