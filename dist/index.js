'use strict';

/* Server  */

var express = require('express');
var app = express();
var mongoose = require('mongoose');

app.listen(3000, function () {
  return console.log('server started');
});