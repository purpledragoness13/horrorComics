const HorrorComic = require('../models/HorrorComic');

const checkHorrorComicOwner = async (req,res, next) => {
	if(req.isAuthenticated()) {//Check if user is logged in
		//if logged in, check if they own the comic
		const horrorComic = await HorrorComic.findById(req.params.id).exec();
		if(horrorComic.owner.id.equals(req.user._id)){
			//if owner than render the form to edit
			next();
		}else{
			res.redirect("back")
		}
	}else{ //if not logged in, redirect to /login 
		res.redirect("/login");
	}
}

module.exports = checkHorrorComicOwner;