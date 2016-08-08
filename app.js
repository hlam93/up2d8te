require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
require('./app_api/models/db');
require('./app_api/config/passport')
// var routes = require('./routes/index');
// var users = require('./routes/users');

/* Use to minify Angular JS scripts into one*/
var uglifyJS = require('uglify-js');
/* Use filesystem to save minified JS file */
var fs = require('fs');
var routesAPI = require('./app_api/routes/index');

var app = express();

var appClientFiles = [
  'app_client/app.js',
  'app_client/home/home.controller.js',
  'app_client/brp/brp.controller.js',
  'app_client/events/events.controller.js',
  'app_client/addEventModal/addEventModal.controller.js',
  'app_client/viewEventModal/viewEventModal.controller.js',
  // 'app_client/editEventModal/editEventModal.controller.js',
  'app_client/auth/login/login.controller.js',
  'app_client/auth/register/register.controller.js',
  'app_client/common/directives/tooltip/tooltip.controller.js',
  'app_client/common/directives/datePicker/datePicker.controller.js',
  'app_client/common/directives/navigation/navigation.controller.js',
  'app_client/common/directives/navModals/navModals.controller.js',
  'app_client/common/directives/sideCol/sideCol.controller.js',
  'app_client/common/directives/pageHeader/pageHeader.controller.js',
  'app_client/common/directives/mainBody/mainBody.controller.js',
  'app_client/common/directives/timePicker/timePicker.controller.js',
  'app_client/common/directives/datePicker/datePicker.directive.js',
  'app_client/common/directives/pageHeader/pageHeader.directive.js',
  'app_client/common/directives/navigation/navigation.directive.js',
  'app_client/common/directives/navModals/navModals.directive.js',
  'app_client/common/directives/verseModal/verseModal.directive.js',
  'app_client/common/directives/footerGeneric/footerGeneric.directive.js',
  'app_client/common/directives/sideCol/sideCol.directive.js',
  'app_client/common/directives/mainBody/mainBody.directive.js',
  'app_client/common/services/geolocation.service.js',
  'app_client/common/services/events.service.js',
  'app_client/common/services/bible.service.js',
  'app_client/common/services/authentication.service.js',
  'app_client/common/filters/addHtmlLineBreaks.filter.js'
  // 'app_client/common/filters/isValidDate.filter.js'
  ];

var uglified = uglifyJS.minify(appClientFiles, { compress : false} );
fs.writeFile('public/angular/forum.min.js', uglified.code, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Script generated and saved: forum.min.js');
  }
});

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// SPA client-side application
app.use(express.static(path.join(__dirname, 'app_client')));

app.use(passport.initialize());
// app.use('/', routes);
// app.use('/users', users);
app.use('/api', routesAPI);

// error handlers
/* catchall when unmatched URL request to SERVER routes
 * or SERVER routes are disabled
 */
app.use(function(req, res) {
  res.sendfile(path.join(__dirname, 'app_client', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
