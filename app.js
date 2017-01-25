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

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
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


request.get('http://data.hslhrt.opendata.arcgis.com/datasets/8baa56336dc74a279c0f0a32998577d4_0.geojson',
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var geojson = body;
        var maplayer = JSON.parse(geojson);
        db.collection('maps').save(maplayer);
      }
    });

app.get('/index.html', function (req, res) {
    console.log("loading index.html");
    Map.find({}, function(err, maps) {
        if(err) throw err;
        res.json(maps);
    });
});
**/

module.exports = app;
