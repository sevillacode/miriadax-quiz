// en routes definimos toda la interfaz

var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller.js');
var commentController = require('../controllers/comment_controller.js');
var sessionController = require('../controllers/session_controller.js');

		process.stdout.write("DEBUG: controladores declarados"+"\n");
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

// autoload de comandos con quizId
router.param('quizId', quizController.load);
router.param('commentId', commentController.load);

router.get('/login', sessionController.new); // formulario login
router.post('/login', sessionController.create); // crear
router.get('/logout', sessionController.destroy); // destruir

router.get('/quizes', quizController.index);
router.get('/quizes/new', sessionController.loginRequired, quizController.new);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.post('/quizes/create', sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);

router.get('/author', quizController.author);

process.stdout.write("DEBUG:resto de rutas declaradas"+"\n");
module.exports = router;
