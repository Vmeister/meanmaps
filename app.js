var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var angular = require('min-angular');
var fs = require('fs');
var request = require('request');
var mongoose = require('mongoose');
var Map = require('./models/Maps');
mongoose.connect('mongodb://localhost/maps');
var db = mongoose.connection;

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public/favicon/', 'map.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Clearing the database after possible server restart
db.collection('maps').remove();

//Database inserts with added documentName-fields
request.get('http://data.hslhrt.opendata.arcgis.com/datasets/8baa56336dc74a279c0f0a32998577d4_0.geojson',
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
            var maplayer = JSON.parse(body);
            Map.collection.insert(maplayer, function(err) {
            var newId = maplayer._id;
            Map.findOneAndUpdate({_id: newId}, {$set:{'documentName': "HSL:n myyntipisteet" }}).exec(function(err, doc) {
            });
        });
      }
    });

request.get('http://data.hslhrt.opendata.arcgis.com/datasets/34a05a35667e42bab70aea78b80165f0_0.geojson',
    function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var maplayer = JSON.parse(body);
            Map.collection.insert(maplayer, function(err) {
                var newId = maplayer._id;
                Map.findOneAndUpdate({_id: newId}, {$set:{'documentName': "HSL:n terminaalit" }}).exec(function(err, doc) {
                });
            });
        }
    });

request.get('http://data.hslhrt.opendata.arcgis.com/datasets/454915a7b25e4a7eac99383c908dc56f_0.geojson',
    function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var maplayer = JSON.parse(body);
            Map.collection.insert(maplayer, function(err) {
                var newId = maplayer._id;
                Map.findOneAndUpdate({_id: newId}, {$set:{'documentName': "HSL:n taksavyöhykkeet" }}).exec(function(err, doc) {
                });
            });
        }
    });


module.exports = app;
