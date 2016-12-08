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


var app = express();

app.set('port', process.env.PORT || 8080);

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

	case "test":
        console.log("запущенная база: " + credentials.mongo.test);
        mongoose.connect(credentials.mongo.test, opts);
		break;

	case "production":
        console.log("запущенная база: " + credentials.mongo.production);
        mongoose.connect(credentials.mongo.production, opts);
		break;

	case "development":
	default:
        console.log("запущенная база: " + credentials.mongo.development);
        mongoose.connect(credentials.mongo.development, opts);
}

app.use(require('cookie-parser')(credentials.cookieSecret));

var sessionParser = require('express-session')({
	resave: false,
	saveUninitialized: false,
	secret: credentials.cookieSecret,

	//это для того, чтобы сеансовое хранилище работало в какой то бд.
	//если поля store нет - то по умолчанию будет храниться в памяти
	//store: sessionStore,
});

app.use(sessionParser);
exports.sessionParser = sessionParser;

var auth = require('./lib/auth.js')(app, {
	providers: credentials.authProviders,
	successRedirect: '/account',
	failureRedirect: '/unauthorized'
});

// auth.init() соединяется в промежуточном ПО Passport:
auth.init();

// теперь мы можем указать наши маршруты auth:
auth.registerRoutes();

app.use(function (req, res, next) {
	res.locals.user = req.user;
	next();
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var server;

if (app.get('port') == 443) {
	let fs = require('fs');

	let options = {
		key: fs.readFileSync('./cfg/ssl/private.key'),
		cert: fs.readFileSync('./cfg/ssl/public.crt')
	};
	server = require('https').createServer(options);

} else {
	server = require('http').createServer();
}

module.exports.server = server;

var refereeRoutes = require('./routes/referee'); //импортируется ниже exports сервера

app.use('/api-referee', refereeRoutes);
app.use('/api/', mainRoutes);
app.use('/api/stage', stageRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/federation', federationRoutes);
app.use('/api/tournament', tournamentRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/vuser', vuserRoutes);

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


server.on('request', app);
server.listen(app.get('port'), function () {
	console.log( 'Express запущен на http://localhost:' +
		app.get('port') + ';\nнажмите Ctrl+C для завершения.' );
});

module.exports.app = app; // для тестирования