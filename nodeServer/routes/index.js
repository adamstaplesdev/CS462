var express = require('express');
var router = express.Router();
var fs = require('fs');
var uuid = require('node-uuid');

function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

router.all('/', index);

function index(req, res) {
  res.render('index', { title: 'Adam Staples Gossip App',
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
    var newuser = req.body.user;
    newuser.userid = uuid.v4();
    newuser.messages = [];

    console.log(req.body.user);
    console.log('registering new user');
    var db = JSON.parse(fs.readFileSync(__dirname + '/profiles.js'));
    db.users.push(newuser);
    req.session.user = {
      username: newuser.username
    }
    fs.writeFileSync(__dirname + '/profiles.js', JSON.stringify(db));
    console.log('users in system:');
    var users = db.users;
    for(var i = 0; i < users.length; i++){
      console.log(users[i].name);
    };
    index(req, res);
  });

router.route('/:username')
  .get(function profile(req, res){
    console.log(req.params.username);
    res.render('profile', { title: 'Adam Staples Gossip App',
                        pathUsername: req.params.username,
                        user: req.session.user,
                        users: JSON.parse(fs.readFileSync(__dirname + '/profiles.js')).users});
  })
  .post(function interaction(req, res){
    //THIS FUNCTION NEEDS TO BE ABLE TO PROCESS RUMORS, WANTS AND NEW MESSAGES FROM A FORM
    console.log(req.params.username);
    /* necessary format:
    {"Rumor" : {"MessageID": "ABCD-1234-ABCD-1234-ABCD-1234:5" ,
                "Originator": "Phil",
                "Text": "Hello World!"
                },
     "EndPoint": "https://example.com/gossip/13244"
    }
    */
  });


module.exports = router;