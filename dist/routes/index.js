'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _index = require('./../routes/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();

var register = function register(req, res, next) {
  if (!req.params.username) return next(new Error('Username must be set.'));
  if (!req.params.password) return next(new Error('Password must be set.'));
  if (!req.params.email) return next(new Error('Email must be set.'));

  _index2.default.findByName(req.params.username, function (err, user) {
    if (err) return next(err);

    // if user not found register
    if (!user) {
      _index2.default.register(req.body.username, req.body.password, req.body.email, req.body.ldap, function (err, user) {
        user.createDate = new Date();
        // send if triggered but not for ldap users
        if (req.body.send && !user.ldap) {
          // send credentials email if requested
          agenda.now('sendCredentials', {
            user: user.username,
            email: user.email,
            password: req.body.password,
            baseUri: req.getBaseUrl()
          });
        }
        res.json({
          status: 'ok'
        });
      });
    } else return next(new Error('User already registered'));
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