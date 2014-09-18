var gzippo  = require('gzippo');
var express = require('express');
var morgan  = require('morgan'); // express 4.0 need to manually load modules
var app 	= express();
 
// app.use(express.logger('dev')); // express 3.0
app.use(morgan('dev')); // express 4.0
app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.listen(process.env.PORT || 5000);