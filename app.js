function startServer() {
	var express = require('express');
	var mongoose = require('mongoose');
	var credentials = require('./cfg/credentials.js');
	var bodyParser = require('body-parser');

	var mainRoutes = require('./routes/main');
	var teamRoutes = require('./routes/team');
	var stageRoutes = require('./routes/stage');
	var matchRoutes = require('./routes/match');
	var vuserRoutes = require('./routes/vuser');
	var tournamentRoutes = require('./routes/tournament');
	var federationRoutes = require('./routes/federation');
	var refereeRoutes = require('./routes/referee');
	var os = require('os');
	
	var app = express();

	app.set('port', process.env.PORT || credentials.serverPort || 8080);

	var opts = {
		server: {
			socketOptions: { keepAlive: 1 }
		}
	};

	mongoose.Promise = global.Promise;

	switch (process.env.NODE_ENV) {
		case "presentation":
			console.log("запущенная база: " + credentials.mongo.presentation);
			mongoose.connect(credentials.mongo.presentation, opts);
			break;

		case "production":
			console.log("запущенная база: " + credentials.mongo.production);
			mongoose.connect(credentials.mongo.production, opts);
			break;

		case "test":
			console.log("запущенная база: " + credentials.mongo.test);
			mongoose.connect(credentials.mongo.test, opts);
			break;

		case "development":
		default:
			console.log("запущенная база: " + credentials.mongo.development);
			mongoose.connect(credentials.mongo.development, opts);
	}

	app.use(require('cookie-parser')(credentials.cookieSecret));

	var session = require('express-session');

	let sessionStore;
	switch (process.env.NODE_ENV) {
		case "presentation":
		case "production":
			var RedisStore = require('connect-redis')(session);
			let redisPort = credentials.redisPort || 6379;
			console.log(`для сессий запущенна база Redis: localhost:${redisPort}`);
			sessionStore = new RedisStore({host: 'localhost', port: redisPort});
			break;

		case "test":
		case "development":
		default:
			console.log("для сессий память процесса");
			var MemoryStore = require('session-memory-store')(session);
			sessionStore = new MemoryStore();
	}

	app.use(session({
		store: sessionStore,
		resave: false,
		saveUninitialized: false,
		secret: credentials.cookieSecret,
	}));

	var auth = require('./lib/auth.js')(app, {
		providers: credentials.authProviders,
		successRedirect: '/',
		failureRedirect: '/unauthorized'
	});

	auth.init();
	auth.registerRoutes();

	app.use(function (req, res, next) {
		res.locals.user = req.user;
		next();
	});

	app.use(express.static('public'));
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	app.use('/api-referee', refereeRoutes);
	app.use('/api/', mainRoutes);
	app.use('/api/stage', stageRoutes);
	app.use('/api/team', teamRoutes);
	app.use('/api/federation', federationRoutes);
	app.use('/api/tournament', tournamentRoutes);
	app.use('/api/match', matchRoutes);
	app.use('/api/vuser', vuserRoutes);

	if (process.env.NODE_ENV != "production") {
		app.get('/epic-fail', function (req, res) {
			process.nextTick(function () {
				throw new Error('Бабах!');
			});
		});
	}

	// пользовательская страница 404
	app.use(/^\/api\/.*$/, function(req, res){
		res.json({
			status: 404,
			message: 'Не найдено'
		});
	});

	// пользовательская страница 500
	app.use(/^\/api\/.*$/, function(err, req, res, next){
		console.error(err.stack);
		res.status(500);
		res.json({
			status: 500,
			message: 'Не найдено'
		});
	});

	app.get(/.*/, function root(req, res) {
		res.sendFile(__dirname  + '/public/index.html');
	});

	var server = require('http').createServer();
	server.on('request', app);
	server.listen(app.get('port'), function () {
		console.log( 'Express запущен на http://localhost:' +
			app.get('port') + '; нажмите Ctrl+C для завершения.' );
	});

	module.exports.app = app; // для тестирования
}

if(require.main === module){
// Приложение запускается непосредственно;
// запускаем сервер приложения
	startServer();
} else {
// Приложение импортируется как модуль
// посредством "require":
// экспортируем функцию для создания сервера
	module.exports = startServer;
}
