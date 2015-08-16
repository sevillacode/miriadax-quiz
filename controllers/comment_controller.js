var models = require('../models/models.js');
process.stdout.write("DEBUG: controlador de comentarios!"+"\n");
// Autoload :id de comentarios
exports.load = function(req, res, next, commentId){
process.stdout.write("DEBUG: entra en autoload"+"\n");
	models.Comment.find({
		where: {
			id: Number(commentId)
		}
	}).then(function(comment){
		process.stdout.write("DEBUG: acabo de buscar"+"\n");
		if(comment){
			
		process.stdout.write("DEBUG: comment es: "+typeof(comment)+"\n");
		process.stdout.write("DEBUG: comment es: "+comment+"\n");
			req.comment = comment;		
			process.stdout.write("DEBUG: req.comment es: "+typeof(req.comment)+"\n");
			process.stdout.write("DEBUG: req.comment es: "+req.comment+"\n");

			next();
		}else{
			process.stdout.write("DEBUG: error y siguiente"+"\n");
			next(new Error('No existe el comentario '+commentId));
		}
	}).catch(function(error){process.stdout.write("DEBUG: error de funcion"+"\n");next(error)});

}

// GET quizes/:quizId/comments/new
exports.new = function(req, res){
	res.render('comments/new.ejs', {quizid: req.params.quizId, errors: []});
}

// POST quizes/:quizId/comments
exports.create = function(req, res){
	var comment = models.Comment.build({ texto: req.body.comment.texto, QuizId: req.params.quizId });
	
	comment.validate().then(function(err){
		if(err){
			res.render('comments/new.ejs', {comment: comment, errors: err.errors});
		}else{
			// save() guarda en DB el campo de texto comment
			comment.save().then(function(){
				res.redirect('/quizes/'+req.params.quizId);
			});
		}
	}).catch(function(error){next(error)});
}

exports.publish = function(req, res){
process.stdout.write("DEBUG: entra en publicar"+"\n");
	req.comment.publicado = true;
	req.comment.save({fields: ['publicado']}).then(function(){
		process.stdout.write("DEBUG: grabado redirecciona"+"\n");
		res.redirect('/quizes/'+req.params.quizId);
	}).catch(function(error){next(error)});;
}
