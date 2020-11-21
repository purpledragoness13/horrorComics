const  isLoggedIn = (req, res, next) =>{
	if(req.isAuthenticated()) {
		return next();
	} else {
		req.flash("error", "Please log in or create an account");
		res.redirect("/login");
	}
};

module.exports = isLoggedIn;