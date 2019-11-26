'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

var register = function register(req, res, next) {
    if (!req.params.username) {
        return next(new Error('Username must be set.'));
    }
    if (!req.params.password) {
        return next(new Error('Password must be set.'));
    }
    if (!req.params.email) {
        return next(new Error('Email must be set.'));
    }

    _models2.default.findByName(req.params.username, function (error, user) {
        if (error) {
            return next(error);
        }

        // if user not found register
        if (!user) {
            _models2.default.register(req.body.username, req.body.password, req.body.email, function (err, newUser) {
                if (err || !newUser) {
                    return next(new Error('Something happend. Could not create new User'));
                }
                res.json({
                    status: 'ok'
                });
                return next();
            });
        } else {
            return next(new Error('User already registered'));
        }
    });
};

// Routes
router.get('/', function (req, res) {
    res.send('HELLO WORLD');
});

router.post('/', function (req, res) {
    res.send('HELLO WORLD');
});

exports.default = router;