
// Definición del modelo Comment con validación

module.exports = function(sequelize, DataTypes){
	process.stdout.write("DEBUG: crea el prototipo de comentario"+"\n");
	return sequelize.define(
		'Comment', {
			texto: {
				type: DataTypes.STRING,
				validate: { notEmpty: { msg: "-> Falta comentario" } }
			},
			publicado: {
				type: DataTypes.BOOLEAN,
				defaultValue: false
			}
		}
	);
}
