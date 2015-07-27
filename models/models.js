
var path = require('path');

// carga modelo ORM
var Sequelize = require('sequelize');

// usa BD sqlite
var sequelize = new Sequelize(null, null, null, {dialect: 'sqlite', storage: 'quiz.sqlite'});

// importa la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// exporta la definicion de la tabla quiz
exports.Quiz = Quiz;

// sequelize.sync() crea e inicializa la tabla en la BD
sequelize.sync().success(function(){
	// success(..) ejecuta el manejador una vez creada la tabla
	Quiz.count.success(function(count){
		// la tabla se inicia solo si esta vacia
		if(count === 0){
			Quiz.create({pregunta: 'Capital de Italia', respuesta: 'Roma'}).success(function(){ console.log('Base de datos actualizada') });
		}
	});
});
