var models = require('../models/models.js');

// conexion de la base de datos


// GET quizes/question
exports.question = function(req, res){
	var provide = function(){
		return models.Quiz.findAll();
	}
	provide().then(function(quiz){
		//console.log(quiz);
		process.stdout.write("DEBUG: quiz es: "+typeof(quiz)+"\n");
		
		process.stdout.write("=============INI===============\n");
		for (var propiedad in quiz){
			process.stdout.write("DEBUG: "+propiedad+" : "+quiz[propiedad]+"\n");
		}
		process.stdout.write("=============FIN===============\n");
		
		
		res.render('quizes/question', {pregunta: quiz[0].pregunta});
	});
};

// GET quizes/answer
exports.answer = function(req, res){
	models.Quiz.findAll().then(function(quiz){
		if(req.query.respuesta === quiz[0].respuesta){
			res.render('quizes/answer', {respuesta: 'Correcta'});
		}else{
			res.render('quizes/answer', {respuesta: 'Incorrecta'});
		}
	});
};

// GET author
exports.author = function(req, res){
	res.render('author');
};
