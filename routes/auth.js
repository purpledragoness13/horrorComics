const User = require('../models/User.js');
const express = require('express');
const router = express.Router();
const passport = require('passport');


//Sign Up - new
router.get('/signup', (req, res) => {
	res.render('signup');
})

// Sign Up - create
router.post('/signup', async (req, res)=>{
	try{
		const newUser = await User.register(new User({
			username: req.body.username,
			email: req.body.email}), req.body.password )	
		
		
			req.flash("success", `Welcome ${newUser.username}, may you never leave.`);
		passport.authenticate('local')(req, res, ()=> {
			res.redirect('/horrorComics');
		})
		
	} catch (err) {
		req.flash("error", "Unable to signup");
		res.redirect('/horrorComics');
	}
});

//login- show form
router.get("/login",(req, res)=>{
	res.render('login');
})

//Login
router.post("/login", passport.authenticate('local', {
	successRedirect: '/horrorComics',
	failureRedirect: '/login',
	failureFlash:true,
	successFlash: "We have been expecting you"
}));

//logout
router.get("/logout",(req,res)=>{
	req.logout();
	req.flash("success","Farewell");
	res.redirect('/horrorComics');
})

module.exports = router;