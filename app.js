/**
 * Module dependencies.
 */
var express = require('express');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var favicon = require('serve-favicon');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var lusca = require('lusca');
var methodOverride = require('method-override');

var _ = require('lodash');
var MongoStore = require('connect-mongo')(session);
var flash = require('express-flash');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var expressValidator = require('express-validator');
var sass = require('node-sass-middleware');


/**
 * Controllers (route handlers).
 */
var userController = require('./controllers/user');
var eventsController = require('./controllers/events');
var adminController = require('./controllers/admin');
var rulesController = require('./controllers/rules');

/**
 * API keys and Passport configuration.
 */
var secrets = require('./config/secrets');
var passportConf = require('./config/passport');

/**
 * Create Express server.
 */
var app = express();

/**
 * Connect to MongoDB.
 */
mongoose.connect(secrets.db);
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(compress());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  debug: true,
  outputStyle: 'expanded'
}));
app.use(logger('dev'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secrets.sessionSecret,
  store: new MongoStore({ url: secrets.db, autoReconnect: true })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca({
  csrf: true,
  xframe: 'SAMEORIGIN',
  xssProtection: true
}));
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});
app.use(function(req, res, next) {
  if (/api/i.test(req.path)) req.session.returnTo = req.path;
  next();
});
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));


/**
 * Primary app routes.
 */
app.get('/api', eventsController.getEvents);
app.get('/', eventsController.getEvents);
app.post('/', eventsController.search);
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/forgot', userController.getForgot);
app.post('/forgot', userController.postForgot);
app.get('/reset/:token', userController.getReset);
app.post('/reset/:token', userController.postReset);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);
app.get('/account', passportConf.isAuthenticated, userController.getAccount);
app.post('/account/profile', passportConf.isAuthenticated, userController.postUpdateProfile);
app.post('/account/password', passportConf.isAuthenticated, userController.postUpdatePassword);
app.post('/account/delete', passportConf.isAuthenticated, userController.postDeleteAccount);
app.get('/account/unlink/:provider', passportConf.isAuthenticated, userController.getOauthUnlink);


/**
 * Event routes
 */
app.get('/events', eventsController.getEvents);
app.post('/events/search', eventsController.search);
app.get('/events/create', passportConf.isAuthenticated, eventsController.createEvent);
app.get('/events/edit/:id', passportConf.isAuthenticated, eventsController.createEvent);
app.post('/events/edit/:id', passportConf.isAuthenticated, eventsController.postEvent);
app.post('/events/create', passportConf.isAuthenticated, eventsController.postEvent);
app.get('/events/my', passportConf.isAuthenticated, eventsController.getMy);
app.post('/events/join', passportConf.isAuthenticated, eventsController.joinEvent);
app.post('/events/leave', passportConf.isAuthenticated, eventsController.leaveEvent);
app.get('/events/:id', eventsController.getEvent);
app.post('/events/comment', passportConf.isAuthenticated, eventsController.postComment);
app.post('/events/nominate', passportConf.isAuthenticated, eventsController.postNominate);

app.get('/admin', passportConf.isAuthenticated, adminController.getAdmin);

app.get('/rules', rulesController.getRules);
app.get('/edit-rules', passportConf.isAuthenticated, rulesController.editRules);
app.post('/edit-rules', passportConf.isAuthenticated, rulesController.postRules);

app.get('/seasons', adminController.getSeasons);
app.get('/create-season', passportConf.isAuthenticated, adminController.createSeason);
app.get('/create-season/:id', passportConf.isAuthenticated, adminController.createSeason);
app.post('/create-season', passportConf.isAuthenticated, adminController.postSeason);
app.post('/create-season/:id', passportConf.isAuthenticated, adminController.postSeason);

app.get('/categories', adminController.getCategories);
app.get('/create-category', passportConf.isAuthenticated, adminController.createCategory);
app.get('/create-category/:id', passportConf.isAuthenticated, adminController.createCategory);
app.post('/create-category', passportConf.isAuthenticated, adminController.postCategory);
app.post('/create-category/:id', passportConf.isAuthenticated, adminController.postCategory);

app.get('/prizes', adminController.getPrizes);
app.get('/create-prize', passportConf.isAuthenticated, adminController.createPrize);
app.get('/create-prize/:id', passportConf.isAuthenticated, adminController.createPrize);
app.post('/create-prize', passportConf.isAuthenticated, adminController.postPrize);
app.post('/create-prize/:id', passportConf.isAuthenticated, adminController.postPrize);

app.get('/judging', userController.getJudging);

app.get('/users', userController.getAllUsers);
app.post('/users', passportConf.isAuthenticated, userController.postUser);



/**
 * OAuth authentication routes. (Sign in)
 */
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), function(req, res) {
  res.redirect(req.session.returnTo || '/');
});

/**
 * Error Handler.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
