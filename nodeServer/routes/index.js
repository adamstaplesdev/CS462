var express = require('express');
var router = express.Router();
var fs = require('fs');

router.all('/', index);

function index(req, res) {
  res.render('index', { title: 'Adam Staples 4Square App',
                        user: req.session.user,
                        users: JSON.parse(fs.readFileSync(__dirname + '/profiles.js')).users});
}

router.route('/login')
  .post(function login(req, res) {
    var user = req.body.user;
    if (user) {
      var users = JSON.parse(fs.readFileSync(__dirname + '/profiles.js')).users;
      for(var i = 0; i < users.length; i++){
        console.log(user.username + '->' + users[i].username);
        if(user.username === users[i].username){
          req.session.user = {
            username: user.username,
          }
        }
      };
    }
    index(req, res);
  })  
  .delete(function logout(req, res) {
    delete req.session.user;
    index(req, res);
  });

router.route('/register')
  .post(function register(req, res) {
    console.log('registering new user');
      var db = JSON.parse(fs.readFileSync(__dirname + '/profiles.js'));
      db.users.push(newuser);
      req.session.user = {
        username: newuser.username
      }
      fs.writeFile(dirname + '/profiles.js', JSON.stringify(db));
      console.log('users in system:');
      var users = db.users;
      for(var i = 0; i < users.length; i++){
        console.log(users[i].name);
      };
    index(req, res);
  });


module.exports = router;