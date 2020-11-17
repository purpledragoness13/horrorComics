const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
	user:{
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	commentText: String,
	horrorComicId: {
		type:mongoose.Schema.Types.ObjectId,
		ref: "horrorComic.js"
	}
});

module.exports= mongoose.model("comment", commentSchema);
