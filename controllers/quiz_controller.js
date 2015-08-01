var models = require('../models/models.js');

exports.index = function(req, res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs', {quizes: quizes});
	});
}

// GET quizes/:id
exports.show = function(req, res){
	process.stdout.write("=============INI===============\n");
	for (var propiedad in req.params){
		process.stdout.write("DEBUG: "+propiedad+" : "+req.params[propiedad]+"\n");
	}
	process.stdout.write("=============FIN===============\n");
		
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show', {quiz: quiz});
	});
};

// GET quizes/:id/answer
exports.answer = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		if(req.query.respuesta === quiz.respuesta){
			res.render('quizes/answer', {quiz: quiz, respuesta: 'Correcta'});
		}else{
			res.render('quizes/answer', {quiz: quiz, respuesta: 'Incorrecta'});
		}
	});
};

// GET author
exports.author = function(req, res){
	res.render('author');
};
