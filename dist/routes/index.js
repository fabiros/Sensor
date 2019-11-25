'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _routes = require('./../routes');

var router = (0, _express.Router)();

router.get('/', function (req, res) {
    res.send('HELLO WORLD');
});

exports.default = router;