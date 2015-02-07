/*
var users = [{ 'name' : 'Adam Staples',
				'username' : 'paperclip27',
				'email' : 'bent.paperclip27@outlook.com',
				'fsqusername' : 'bentpaperclip' }
			];
*/
module.exports = {
	function login (req, res, next) {
		console.log('login called');
		var method = req.method.toLowerCase(), //cache the method
			user = req.body.user,
			newuser = req.body.newuser,
			logout = (method === 'delete'),
			login = (user && method === 'post'),
			register = (newuser && method === 'post');
		//console.log(method + '\n' + user + '\n' + newuser + '\n' + logout + '\n' + login + '\n' + register); 

		if (logout) {delete req.session.user;}
		if (login) {
			var users = JSON.parse(fs.readFileSync('./db/profiles')).users;
			for(var i = 0; i < users.length; i++){
				console.log(user.username + '->' + users[i].username);
				if(user.username === users[i].username){
					req.session.user = {
						username: user.username,
					}
				}
			};
		}
		if (register) {
			console.log('registering new user');
			var db = JSON.parse(fs.readFileSync('./db/profiles'));
			db.users.push(newuser);
			req.session.user = {
				username: newuser.username
			}
			fs.writeFile('./db/profiles', JSON.stringify(db));
			console.log('users in system:');
			var users = db.users;
			for(var i = 0; i < users.length; i++){
				console.log(users[i].name);
			};
		}
		if (!req.session.user){return next();}
		res.locals.user = req.session.user;
		next();
	}
}