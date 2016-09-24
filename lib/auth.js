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
	// если перенаправления для успеха и неуспеха не определены,
	// установите разумные значения по умолчанию
	if(!options.successRedirect)
		options.successRedirect = '/account';

	if(!options.failureRedirect)
		options.failureRedirect = '/login';

	return {
		init: function() {
			var env = app.get('env');
			var config = options.providers;
			
			// конфигурирование стратегии Vkontakte
			passport.use(new VkontakteStrategy({
				clientID: config.vkontakte.appId,
				clientSecret: config.vkontakte.appSecret,
				callbackURL: (options.baseUrl || '') + '/auth/vkontakte/callback',
			}, function(accessToken, refreshToken, profile, done){
				var authId = 'vkontakte:' + profile.id;
				
				User.findOne({ authId: authId }, function(err, user){
					if(err) return done(err, null);
					if(user) return done(null, user);
					
					user = new User({
						authId: authId,
						name: profile.displayName,
						created: Date.now(),
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
				if(req.query.redirect) 
					req.session.authRedirect = req.query.redirect;
			
				passport.authenticate('vkontakte')(req, res, next);
			});

			app.get('/auth/vkontakte/callback', 
				passport.authenticate('vkontakte',
					{ failureRedirect: options.failureRedirect }),
				function(req, res){
					// мы сюда попадаем только при успешной аутентификации
					var redirect = req.session.authRedirect;
					if(redirect) delete req.session.authRedirect;
					res.redirect(303, redirect || options.successRedirect);
				});

			app.get('/logout', function(req, res){
				req.logout();
				res.redirect('/');
			});
		},
	};
};
