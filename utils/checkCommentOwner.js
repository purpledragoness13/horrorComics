const Comment = require('../models/Comment');

const checkCommentOwner = async (req,res, next) => {
	if(req.isAuthenticated()) {//Check if user is logged in
		//if logged in, check if they own the comment
		const comment = await Comment.findById(req.params.commentId).exec();
		if(comment.user.id.equals(req.user._id)){
			//if owner than render the form to edit
			next();
		}else{
			res.flash("error","This is not yours")
			res.redirect("back")
		}
	}else{ //if not logged in, redirect to /login 
		res.flash("error","Please Login")
		res.redirect("/login");
	}
}

module.exports = checkCommentOwner;