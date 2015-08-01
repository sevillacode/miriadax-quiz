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
	process.stdout.write("DEBUG: entra en index para ver si muestra todos o filtra\n");
	process.stdout.write("DEBUG: search es: "+req.query.search+"\n");
		
	if(req.query.search){
		var listado = function(models,req){
			return models.Quiz.findAll({ where: ["pregunta like %", req.query.search.replace(" ","%")]});
			process.stdout.write("DEBUG: Filtra!\n");
		}
	}else{
		var listado = function(models){
			return models.Quiz.findAll();
			process.stdout.write("DEBUG: No filtra\n");
		}
	}
	
	listado().then(function(quizes){
		
	process.stdout.write("DEBUG: quizes: ".quizes."\n");
		res.render('quizes/index.ejs', {quizes: quizes});
	}).catch(function(error){ next(error); });
}

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
