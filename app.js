var express = require('express');
var mongoose = require('mongoose');
var main = require('./routes/main');
var bodyParser = require('body-parser');
var exphbs   = require('express-handlebars');

var app = express();

app.set('port', process.env.PORT || 8080);

app.engine('handlebars', exphbs({defaultLayout: 'base'}));
app.set('view engine', 'handlebars');

var opts = {
	server: {
		socketOptions: { keepAlive: 1 }
	}
};
mongoose.connect('mongodb://localhost:27017/football', opts);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', main);

// пользовательская страница 404
app.use(function(req, res){
	res.type('text/plain');
	res.status(404);
	res.send('404 — Не найдено');
});

// пользовательская страница 500
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 — Ошибка сервера');
});

app.listen(app.get('port'), function(){
	console.log( 'Express запущен на http://localhost:' +
	app.get('port') + '; нажмите Ctrl+C для завершения.' );
});
