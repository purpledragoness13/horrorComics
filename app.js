//=================================================================
// Imports
//=================================================================
//NPM Imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const passport = require('passport');
const passportLocal = require('passport-local');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');
// Config Imports
const config = require('./config.js');
// Route Imports
const horrorComicRoutes = require('./routes/horrorComics.js');
const commentRoutes = require('./routes/comments.js');
const mainRoutes= require('./routes/main.js');
const authRoutes= require('./routes/auth.js')
// Model Imports
const HorrorComic = require('./models/HorrorComic');
const Comment = require('./models/Comment.js');
const User = require('./models/User.js');

//=================================================================
//Development
//=================================================================
// Morgan
app.use(morgan('tiny'))

//Seed the DB
//const seed = require('./utils/seed.js');
//seed();

//=================================================================
//Config
//=================================================================
//mongoose config
mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.Promise = global.Promise;
// Express Config
app.set("view engine", "ejs");
app.use(express.static('public'));
// body Parser config
app.use(bodyParser.urlencoded({extended: true}));

//Express session config
app.use(expressSession({
	secret: "words",
	resave:false,
	saveUninitialized:false
}));

//passport config
app.use(passport.initialize());
app.use(passport.session()); // allows persistent sessions
passport.serializeUser(User.serializeUser()); // what data should be stored in the session
passport.deserializeUser(User.deserializeUser()); // get user data from the stored session
passport.use(new LocalStrategy(User.authenticate())); //use the local strategy

//Current user middleware Config
app.use((req, res, next) =>{
	res.locals.user = req.user;
	next();
})

// Method override config
app.use(methodOverride('_method'));



// Route config
app.use("/", mainRoutes);
app.use("/", authRoutes);
app.use("/horrorComics", horrorComicRoutes);
app.use("/horrorComics/:id/comments",commentRoutes);


//=================================================================
//Listen
//=================================================================

app.listen(3000, () => {
	console.log("yelp clone is running...");
});