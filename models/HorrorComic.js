const mongoose = require("mongoose");

const horrorComicSchema = new mongoose.Schema({
	title: String,
	date: Date,
	series: String,
	issue: Number,
	image_link: String,
	author: String,
	illustrator: String,
	publisher: String,
	subgenre: String,
	rating:String,
	description: String,
	completionStatus:String,
	owner: {
		id: {
		   type: mongoose.Schema.Types.ObjectId,
			ref:"User"
	        },
	username: String
	},
	upvotes: [String],
	downvotes: [String]
});

horrorComicSchema.index({
	'$**': 'text'
})

module.exports = mongoose.model("horrorComic",horrorComicSchema);