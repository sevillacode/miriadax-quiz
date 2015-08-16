var users = {
	admin: { id: 1, username: 'admin', password: '1234' }
	pepe:  { id: 2, username: 'pepe', password: '5678' }
};

// Comprueba si el usuario está registrado en users
// si autenticación falla o hay errores se ejecuta callback(error)
// si recuerdas callback es la función (tercer parámetro) en la llamada

exports.autenticar = function(login, password, callback){
	if(users[login]){
		if(password === users[login].password){
			callback(null, users[login]); 
		}else{
			callback(new Error('No existe el usuario'));
		}
	}else{
		callback(new Error('No existe el usuario'));
	}
}
