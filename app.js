var express = require('express');
var mongoose = require('mongoose');
var credentials = require('./credentials.js');
var mainRoutes = require('./routes/main');
var refereeRoutes = require('./routes/referee');
var teamRoutes = require('./routes/team');
var stageRoutes = require('./routes/stage');
var matchRoutes = require('./routes/match');
var tournamentRoutes = require('./routes/tournament');
var federationRoutes = require('./routes/federation');
var bodyParser = require('body-parser');

var app = express();

app.set('port', process.env.PORT || 8080);

var opts = {
	server: {
		socketOptions: { keepAlive: 1 }
	}
};
mongoose.connect(credentials.mongo.stringConnection, opts);

app.use(require('cookie-parser')(credentials.cookieSecret));

//Обеспечивает поддержку сеансов на основе идентификатора сеанса, хранимого
// в cookie-файле. По умолчанию используется хранилище в памяти, не подходя-
// щее для реальных условий эксплуатации, но может быть настроено для при-
// менения хранилища на основе базы данных (см. главы 9 и 13).
app.use(require('express-session')({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,

    //это для того, чтобы сеансовое хранилище работало в какой то бд.
    //если поля store нет - то по умолчанию будет храниться в памяти
	//store: sessionStore,
}));


var auth = require('./lib/auth.js')(app, {
	// baseUrl опционален; по умолчанию будет
	// использоваться localhost, если вы пропустите его;
	// имеет смысл установить его, если вы не
	// работаете на своей локальной машине. Например,
	// если вы используете staging-сервер,
	// можете установить в переменной окружения BASE_URL
	// https://staging.meadowlark.com
	baseUrl: process.env.BASE_URL,
	providers: credentials.authProviders,
	successRedirect: '/account',
	failureRedirect: '/unauthorized'
});

// auth.init() соединяется в промежуточном ПО Passport:
auth.init();

// теперь мы можем указать наши маршруты auth:
auth.registerRoutes();

app.set('port', process.env.PORT || 8080);

app.use(function (req, res, next) {
	res.locals.user = req.user;
	next();
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/', mainRoutes);
app.use('/api-referee', refereeRoutes);
app.use('/api/stage', stageRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/federation', federationRoutes);
app.use('/api/tournament', tournamentRoutes);
app.use('/api/match', matchRoutes);



app.get(/.*/, function root(req, res) {
	res.sendFile(__dirname  + '/public/index.html');
});

// пользовательская страница 404
app.use(function(req, res){
	res.status(404);
	res.json({
		code: 404,
		message: 'Не найдено'
	});
}); 

// пользовательская страница 500
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.json({
		code: 500,
		message: 'Не найдено'
	});
});

app.listen(app.get('port'), function(){
	console.log( 'Express запущен на http://localhost:' +
	app.get('port') + '; нажмите Ctrl+C для завершения.' );
});
