const HorrorComic = require('../models/HorrorComic.js');
const Comment = require('../models/Comment');


const horrorComicSeeds = [
	{
		title: "Beautiful Darkness",
		summary:"A beutiful fantasy horror fairytale that investigates the troupe of 'tiny' people' made popular by 'The Secret World of Arriety','Tom Thumb', and 'Thumbelina', through a horror lens. The story revolves around the kind Aurora and the community she lives in trying to survive in a big world.",
		subgenre:"Fantasy Horror",
		Date:" 06/03/2009",
		author:"Fabien Vehlmann Kerascoët",
		series:"Not part of a series",
		issue:"000",
		rating:"T",
		illustrator:" Fabien Vehlmann Kerascoët ",
		image_link:"https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1364599765l/17287069.jpg",
		completionStatus:"One Shot",
		publisher:"Drawn and Quarterly"
	}
]

const seed = async () => {
	// delete all the current comics and comments
	await HorrorComic.deleteMany();
	console.log("Deleted All the Comics!")
	
	await Comment.deleteMany();
	console.log("Deleted All the Comments!")
	
	// create three new comics
	/*
	for(const horrorComicSeed of horrorComicSeeds){
		let newHorrorComic = await HorrorComic.create(horrorComicSeed);
		console.log("Created a new comic:", newHorrorComic.title);
		await Comment.create({
			text: " I liked this",
			user: "pantherXXXXXXpower",
			horrorComicId: newHorrorComic._id
		})
		console.log("Created a new comment!")
	}
	*/
}


module.exports = seed;