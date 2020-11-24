const express = require('express');
const router = express.Router();
const isLoggedIn= require('../utils/isLoggedIn.js');
const HorrorComic = require('../models/HorrorComic');
const Comment = require('../models/Comment');
const checkHorrorComicOwner = require('../utils/checkHorrorComicOwner');
//Index
router.get("/", async (req, res) => {
	console.log(req.user);
	try{
	const horrorComics = await HorrorComic.find().exec();
	req.flash("success", "Your horror comic has been created");
	res.render("horrorComics", {horrorComics});
	}catch(err) {
		req.flash("error","There was a problem creating your comic")
		res.redirect("/horrorComics");
	}
})

//Create
router.post("/", isLoggedIn, async (req, res) => {
	console.log("post")
	const subgenre = req.body.subgenre.toLowerCase();
	const newHorrorComic ={
		title: req.body.title,
		author:req.body.author,
		issue:req.body.issue,
		series:req.body.series,
		date:req.body.date,
		illustrator:req.body.illustrator,
		publisher:req.body.publisher,
	    description: req.body.description,
	    image_link: req.body.image_link,
        rated: req.body.rated,
        subgenre: req.body.subgenre,
        completionStatus: req.body.completionStatus,
		owner: {
			id: req.user.id,
			username: req.user.username
		},
		upvotes: [req.user.username],
		downvotes:[]
	}
	try{
		const horrorComic = await HorrorComic.create(newHorrorComic);
		req.flash("success", "Horror Comic added to library.")
	res.redirect("/horrorComics/" + horrorComic._id);
	}catch (err){
	req.flash("error","Horror Comic not added to library, try agian.")
		res.redirect("/horrorComics");
	}
});
   
//New
router.get("/new", isLoggedIn, (req, res) => {
	res.render("horrorComics_new");
	
});

//search
router.get("/search", async (req, res) => {
	try{
		const horrorComics = await HorrorComic.find({
			$text:{
				$search:req.query.term
			}
		});
		res.render("horrorComics", {horrorComics});
	}catch (err){
		req.flash("error","No such Tome")
		res.redirect("/horrorComics");
	}
})

//Genre
router.get("/genre/:genreName", async (req, res) =>{
	//check if the given genre is valid
	const validGenres = ["horrorcomedy","psycologicalhorror","lovecraftianhorror","ghoststory","southerngothic","bodyhorror","cthulhumythos","fantasyhorror","japanesehorror","urbangothic","wierdfiction","survivalhorror","occultdetectivefiction","sci-fi-horror","horrorwebcomics","horrormanga"];
	if(validGenres.includes(req.params.genre.toLowerCase())) {
		const horrorComics = await HorrorComic.find({genre:req.params.genre}).exec();
		res.render("horrorComics",{horrorComics});
	} else{
		res.send()
    }
});

//show
router.get("/:id", async (req,res) => {
	try{
		const horrorComic = await HorrorComic.findById(req.params.id).exec();
		const Comments = await Comment.find({horrorComicId: req.params.id});
		console.log(horrorComic)
		res.render("horrorComicsShow", {horrorComic, Comments});
	}catch (err){
		console.log(err);
		res.send(" error in horrorComics/:id GET")
	}

})


router.post("/vote",isLoggedIn,(req,res) => {
	res.json({
		message:"Thank you for voting"
	});
});

//edit
router.get("/:id/edit", checkHorrorComicOwner, async (req, res) => {
		const horrorComic = await HorrorComic.findById(req.params.id).exec();
	    res.render("horrorComicsEdit",{horrorComic});
})

//update
router.put("/:id", checkHorrorComicOwner, async (req, res) => {
	const subgenre = req.body.subgenre.toLowerCase();
	const horrorComic ={
		title: req.body.title,
		author:req.body.author,
		issue:req.body.issue,
		series:req.body.series,
		date:req.body.date,
		illustrator:req.body.illustrator,
		publisher:req.body.publisher,
	    description: req.body.description,
	    image: req.body.image,
        rated: req.body.rated,
        subgenre,
        completionStatus: req.body.completionStatus,
		owner: {
			id: req.user._id,
			username: req.user.username
		}
	}
	
	try{
		const updatedHorrorComic = await HorrorComic.findByIdAndUpdate(req.params.id, horrorComic, {new: true}).exec();
		req.flash("success","Horror Comic Updated")
	    res.redirect(`/horrorComics/${req.params.id}`);
	} catch (err) {
		req.flash("error", "Update Failure"),
		res.redirect("/horrorComics");
	}
	});


//delete
router.delete("/:id", checkHorrorComicOwner, async (req,res) => {
	try{
	const horrorComic = await HorrorComic.findByIdAndDelete(req.params.id).exec();
	req.flash("success","It is Done.")
		console.log("Deleted:", horrorComic);
		res.redirect("/horrorComics");
	}catch (err){
		console.log(err);
		req.flash("error","Unable to delete comic"),
		res.redirect("back");
	}
})




module.exports = router;