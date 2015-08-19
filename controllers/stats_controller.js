var models = require('../models/models.js');

// muestra las estadísticas
exports.show = function(req, res, next){
	
	// se inicia
	var stats = {
		quizes: 0,
		comments: 0,
		waiting: 0,
		published: 0,
		average: 0
	}

	models.Quiz.count().then(
		function(numQuizes){
			stats.quizes = numQuizes;
		}
	);
	
	models.Comment.findAll().then(
		function(comments){
			for(comment in comments){
				stats.comments++;
				(!comment.publicado) ? stats.waiting++ : stats.published++;
			}
		}
	);
	
	stats.average = (stats.comments*100)/stats.quizes;
	
	res.render('stats.ejs', {stats: stats});
}
