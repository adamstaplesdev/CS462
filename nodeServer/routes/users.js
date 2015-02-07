var express = require('express');
var router = express.Router();
//var login = require('./login');
//var register = require('./register');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('List all registered users here');
});
/*
router.get('/register', function(req, res, next){
    res.render('register');
});

router.post('/register', register);

router.get('/login', function(req, res, next){
    res.render('login');
});

router.post('/login', login);
*/
router.get('/:username', function(req, res, next){
  res.send('The user ' + req.params.username + ' has not been registered');
});

module.exports = router;
