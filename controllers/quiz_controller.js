var models = require('../models/models.js');

exports.load = function(req, res, next, quizId){
	models.Quiz.findById(quizId).then(
		function(quiz){
			if(quiz){
				req.quiz = quiz;
				next();
			}else{
				next(new Error('No existe el id: '+quizId));
			}
		}
	).catch( function(error){ next(error); } );
}

exports.index = function(req, res, next){
	var filtro = undefined;	
	if(typeof(req.query.search) != "undefined" && req.query.search.length > 0){
		var busqueda = '%'+req.query.search.replace(" ","%")+'%';
		filtro = { where: ["pregunta like ?", busqueda], order:"pregunta"};
	}
	
	models.Quiz.findAll(filtro).then(function(quizes){
		res.render('quizes/index.ejs', {quizes: quizes});
	}).catch(function(error){ next(error); });
}

// GET quizes/new
exports.new = function(req, res){
	var quiz = models.Quiz.build({pregunta: "Pregunta", respuesta: "Respuesta"});
	res.render('quizes/new', {quiz: quiz});
};

// GET quizes/:id
exports.show = function(req, res){
	res.render('quizes/show', {quiz: req.quiz});
};

// GET quizes/:id/answer
exports.answer = function(req, res){
	var resultado = 'Incorrecto';
	if(req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};

// GET author
exports.author = function(req, res){
	res.render('author');
};

// POST quizes/create
exports.create = function(req, res){
	var quiz = models.Quiz.build(req.body.quiz);
	// guarda en DB
	quiz.save({fields: ["pregunta","respuesta"]}).then(function(){res.redirect('/quizes')});
}
