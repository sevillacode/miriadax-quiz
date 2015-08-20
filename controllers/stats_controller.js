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
	
	process.stdout.write("DEBUG: modelo iniciado, contando\n");
	models.Quiz.findAll().then(
		function(numQuizes){
			process.stdout.write("DEBUG: ha contado: "+numQuizes.length+"\n");
			stats.quizes = numQuizes.length;
			process.stdout.write("DEBUG: stats.quizes: "+stats.quizes+"\n");
			next();
		}
	);
	
	process.stdout.write("DEBUG: cuenta terminada, obteniendo comentarios\n");
	models.Comment.count().then(
		function(comments){
		process.stdout.write("DEBUG: cuenta de comentarios: "+comments+"\n");
			//process.stdout.write("=============INI===============\n");
			//for (var propiedad in comments){
			//	process.stdout.write("DEBUG: "+propiedad+" : "+comments[propiedad]+"\n");
			//}
			//process.stdout.write("=============FIN===============\n");
			//for(comment in comments){
			//	stats.comments++;
			//	(!comment.publicado) ? stats.waiting++ : stats.published++;
			//}
			next();
		}
	).then(function(){
	process.stdout.write("DEBUG: comentarios terminado, calculando media\n");
	
	stats.average = (stats.comments*100)/stats.quizes;
	process.stdout.write("DEBUG: renderizando vista\n");
	
	res.render('stats.ejs', {stats: stats, errors: {}});
	});
}
