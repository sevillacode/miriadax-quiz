var models = require('../models/models.js');

// se inicia
var stats = {
	quizes: 0,
	comments: 0,
	waiting: 0,
	published: 0,
	average: 0
}

// muestra las estadísticas
exports.show = function(req, res){
	
	models.Quiz.findAll().then(
		function(numQuizes){
			stats.quizes = numQuizes.length;
		}
	).then(
		function(){
			models.Comment.findAll().then(
				function(comments){
					for(comment in comments){
						stats.comments++;
						(!comment.publicado) ? stats.waiting++ : stats.published++;
					}
					
				}
			).then(function(){
			stats.average = (stats.comments*100)/stats.quizes;
			res.render('stats.ejs', {stats: stats, errors: {}});
			});
		}
	);
}
