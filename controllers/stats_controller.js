var models = require('../models/models.js');

// se inicia
var stats = {
	quizes: 0,
	comments: 0,
	waiting: 0,
	published: 0,
	average: 0,
	commented: 0,
	nonCommented: 0
}

// muestra las estadísticas
exports.show = function(req, res){
	
	models.Quiz.findAll().then(
		function(numQuizes){
			stats.quizes = numQuizes.length;
		}
	).then(
		function(){
			models.Comment.findAndCountAll().then(
				function(result) {
					var esperando = 0, publicado = 0, comentado = [];
					for(k in result.rows){
						(!result.rows[k].publicado) ? esperando++ : publicado++;
						process.stdout.write("DEBUG: "+result.rows[k].QuizId+"\n");
						comentado[result.rows[k].QuizId] = 1;
					}
					stats.waiting = esperando;
					stats.published = publicado;
					stats.comments = (Number(esperando) + Number(publicado));
					stats.commented = Number(comentado.length);
					stats.nonCommented = (stats.comments - stats.commented);
				}
			)
			.then(function(){
			stats.average = (stats.comments*100)/stats.quizes;
			res.render('stats.ejs', {stats: stats, errors: {}});
			});
		}
	);
}
