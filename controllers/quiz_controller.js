var models = require('../models/models.js');

// GET quizes/question
exports.question = function(req, res){
	models.Quiz.findAll().then(function(quiz){
		//console.log(quiz);
		res.render('quizes/question', {pregunta: quiz});
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
