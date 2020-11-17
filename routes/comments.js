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
		console.log(comment);
		res.redirect(`/horrorComics/${req.body.horrorComicId}`);	
	}catch(err){
		console.log(err);
		res.send("Error at comments.js/create comment and update database");
	}
});

//edit Comment show edit form
router.get("/:commentId/edit", checkCommentOwner, async (req, res) => {
	try{
		const horrorComic = await HorrorComic.findById(req.params.id).exec();
		const comment = await Comment.findById(req.params.commmentId).exec();
		console.log("horrorComic", horrorComic);
		console.log("comment", comment);
		res.render("comments_edit", {horrorComic, comment});
	}catch(err){
		console.log(err);
		res.send("Error at comments.js/show comment edit")
	}
});
		 
//update edit form

router.put("/:commentId", checkCommentOwner, async (req, res) =>{
	try{
		const comment = await Comment.findByIdAndUpdate(req.params.commentId, {commentText:req.body.commentText}, {new: true});
		console.log(comment);
		res.redirect(`/horrorComics/${req.params.id}`);
	}catch(err){
		console.log(err);
		res.send("Error at comments.js update edit form")
	}
})

//Delete comment 
router.delete("/:commentId", checkCommentOwner, async (req, res) => {
	try{
		const comment = await Comment.findByIdAndDelete(req.params.commentId);
		console.log(comment);
		res.redirect(`/horrorComics/${req.params.id}`);
	}catch(err){
		console.log(err);
		res.send("Error in comment.js delete comment")
	}
})



module.exports = router;
		   
		   
		   
		   
		   
		   