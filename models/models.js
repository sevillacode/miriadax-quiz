
var path = require('path');

// Postgres DATABASE_URL = postgres://usuario:password@host:puerto/database
// Sqlite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);

var DB_name = (url[6] || null);
var user = (url[2] || null);
var pwd = (url[3] || null);
var protocol = (url[1] || null);
var dialect = (url[1] || null);
var port = (url[5] || null);
var host = (url[4] || null);
var storage = process.env.DATABASE_STORAGE;



// carga modelo ORM
var Sequelize = require('sequelize');

// usa BD
var sequelize = new Sequelize(DB_name, user, pwd, { 
													dialect: dialect,  
													protocol: protocol, 
													host: host, 
													port: port, 
													storage: storage, 
													omitNull: true 
													});


// importa la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// importa la definición de la tabla comentarios
var comment_path = path.join(__dirname, 'comment');
var Comment = sequelize.import(comment_path);

// sequelize define la relación entre quizes y comentarios en una relacion 1-X
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

// exporta la definicion de la tabla quiz y la de comentarios
exports.Quiz = Quiz;
exports.Comment = Comment;


// sequelize.sync() crea e inicializa la tabla en la BD
sequelize.sync().then(function(){
	// then(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count){
		// la tabla se inicia solo si esta vacia
		// para borrar la bd en heroku recuerda: heroku pg:reset DATABASE o desde el dashboard de la bd ne heroku postgre
		if(count === 0){
			Quiz.create({pregunta: 'Año inicio timestamp unix', respuesta: '1970', tema: 'Ciencia'}).then(function(){ process.stdout.write("DEBUG: Base de datos actualizada\n") });
		}
	});
});
