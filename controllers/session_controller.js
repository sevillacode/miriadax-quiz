// GET /login - formulario
exports.new = function(req, res){
	var errors = req.session.errors || {};
	res.render('sessions/new', {errors: errors});
}

// POST /login - crear
exports.create = function(req, res){
	var login = req.body.login;
	var password = req.body.password;
	var userController = require('./user_controller');
	
	userController.autenticar(login, password, function(error, user){
		if(error){
			req.session.errors = [{'message': 'Se ha producido un error: '+error}];
			res.redirect('/login');
			return;
		}
		
		// crear req.session.user y guardar campos id y username
		// la sesión se define por la existencia de req.session.user
		req.session.user = {id: user.id, username: user.username};
		
		// redirecciona al path anterior al login tal como se definió en session.redir
		res.redirect(req.session.redir.toString()); 
		
	});
}

// DELETE /logout - destruir sesión
exports.destroy = function(req, res){
	delete(req.session.user);
	res.redirect(req.session.redir.toString());
}
