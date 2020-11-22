const express = require('express');
const router = express.Router({mergeParams:true});
const Comment = require('../models/Comment');
const HorrorComic = require('../models/HorrorComic');
const isLoggedIn = require('../utils/isLoggedIn.js');
const checkCommentOwner = require('../utils/checkCommentOwner');

//New comment show form
router.get("/new",isLoggedIn,(req, res) => {
	res.render("commentsNew.ejs", {horrorComicId: req.params.id})
})

// create comment and update database
router.post("/", isLoggedIn, async (req, res) => {
	//create the comment
	try{
		const comment = await Comment.create({
		user: {
		    id: req.user._id,
			username: req.user.username
		},
		commentText: req.body.commentText,
		horrorComicId: req.body.horrorComicId
			});
		res.flash("success","Comment Posted")
		res.redirect(`/horrorComics/${req.body.horrorComicId}`);	
	}catch(err){
		res.flash("error", "Comment Not Posted")
		res.redirect("/horrorComics");
	}
});

//edit Comment show edit form
router.get("/:commentId/edit", checkCommentOwner, async (req, res) => {
	try{
		const horrorComic = await HorrorComic.findById(req.params.id).exec();
		const comment = await Comment.findById(req.params.commmentId).exec();
		res.flash("success","Successfully Updated")
		res.render("comments_edit", {horrorComic, comment});
	}catch(err){
		res.flash("error", "Unable to Update Comic")
		res.redirect("/horrorComics");
	}
});
		 
//update edit form

router.put("/:commentId", checkCommentOwner, async (req, res) =>{
	try{
		const comment = await Comment.findByIdAndUpdate(req.params.commentId, {commentText:req.body.commentText}, {new: true});
		res.flash("success","Edited")
		res.redirect(`/horrorComics/${req.params.id}`);
	}catch(err){
		res.flash("error", "Unable to Edit Horror Comic")
		res.redirect("/horrorComics");
	}
})

//Delete comment 
router.delete("/:commentId", checkCommentOwner, async (req, res) => {
	try{
		const comment = await Comment.findByIdAndDelete(req.params.commentId);
		res.flash("success","It is Done")
		res.redirect(`/horrorComics/${req.params.id}`);
	}catch(err){
		res.flash("error", "Comment not Deleted")
		res.redirect("/horrorComics");
	}
})



module.exports = router;
		   
		   
		   
		   
		   
		   