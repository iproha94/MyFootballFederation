var User = require('../models/user.js'),
	passport = require('passport'),
	VkontakteStrategy = require('passport-vkontakte').Strategy;

//этот метод требуется для passport (см. стр. 262 гл. 18)
passport.serializeUser(function(user, done){
	done(null, user._id);
});

//этот метод требуется для passport (см. стр. 262 гл. 18)
passport.deserializeUser(function(id, done){
	User.findById(id, function(err, user){
		if(err || !user) return done(err, null);
		done(null, user);
	});
});

module.exports = function(app, options){
	if(!options.successRedirect)
		options.successRedirect = '/';

	if(!options.failureRedirect)
		options.failureRedirect = '/unauthorized';

	return {
		init: function() {
			// конфигурирование стратегии Vkontakte
			passport.use(new VkontakteStrategy({
				clientID: options.providers.vkontakte.appId,
				clientSecret: options.providers.vkontakte.appSecret,
				callbackURL: '/auth/vkontakte/callback',
			}, function(accessToken, refreshToken, profile, done){
				var authId = 'vkontakte:' + profile.id;

				User.findOne({ authId: authId }, function(err, user){
					if(err) return done(err, null);
					if(user) return done(null, user);

					user = new User({
						authId: authId,
						name: profile.displayName,
						created: Date.now(),
						image: profile.photos[0].value
					});

					user.save(function(err){
						if(err) return done(err, null);
						done(null, user);
					});
				});
			}));

			app.use(passport.initialize());
			app.use(passport.session());
		},

		registerRoutes: function() {
			// регистрируем маршруты vkontakte
			app.get('/auth/vkontakte', function(req, res, next){
				req.session.callback = req.query.callback;

                //костыль, для корректной переадресации при nginx
                //passport._strategies.vkontakte._callbackURL = req.headers.referer + 'auth/vkontakte/callback';

				passport.authenticate('vkontakte')(req, res, next);
			});

			app.get('/auth/vkontakte/callback',
				passport.authenticate('vkontakte',
					{ failureRedirect: options.failureRedirect }),
				function(req, res){
					// мы сюда попадаем только при успешной аутентификации
					res.send(`${req.session.callback}({message: "Вы успешно вошли"})`);
				});

			app.get('/logout', function(req, res){
				req.logout();
				res.send(`${req.query.callback}({message: "Вы успешно вышли"})`);
			});
		}
	};
};
