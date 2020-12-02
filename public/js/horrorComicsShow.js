//=========================
//SELECT ELEMENTS
//=========================
const HorrorComic = require('../models/HorrorComic.js');
const User = require('../models/User.js');
const upvoteButton=document.getElementById("upvoteButton");
const downvoteButton=document.getElementById("downvoteButton");
const score = document.getElementById("score"); 
const hasReadButton= document.getElementById("hasReadButton");
const wantsToRead = document.getElementById("wantsToRead");
//=========================
//HELPER FUNCTIONS
//=========================
const addToWantList = async (req, res) => {
	const options = {
		method: "POST",
		headers:{
			'Content-Type': 'application/json'
		}
                     }
	     options.body = JSON.stringify({
			 horrorComicId
		 })
	user.wantsToRead = options.body;
	}

const addToReadList = async (req, res) => {
	const options = {
		method: "POST",
		headers:{
			'Content-Type': 'application/json'
		}
                     }
	     options.body = JSON.stringify({
			 horrorComicId
		 })
	user.hasRead = options.body;
}

const sendVote =async (voteType) => {
		//build fetch options
	const options = {
		method: "POST",
		headers:{
			'Content-Type': 'application/json'
		}
	}
	if(voteType === "up") {
		options.body = JSON.stringify({
			voteType:"up",
			horrorComicId
		});
	}else if(voteType ==="down"){
		options.body = JSON.stringify({
			voteType:"down",
			horrorComicId
		});
	}else{
		throw "voteType must be 'up' or 'down'" 
	}
	//send fetch request
	await fetch("/horrorComics/vote",options) 
	.then(data => {
		return data.json()
	})
	.then(res =>{
		console.log(res);
		handleVote(res.score, res.code)
	})
	.catch(err => {
		console.log(err);
	})
}

const handleVote = (newScore, code) => {
	//update the score
	score.innerText = newScore
	
	//update button colors
	if(code === 0){
	    upvoteButton.classList.remove("btn-success");
		upvoteButton.classList.add("btn-outline-success");
		downvoteButton.classList.remove("btn-danger");
		downvoteButton.classList.add("btn-outline-danger");
	} else if (code === 1){
		upvoteButton.classList.remove("btn-outline-success");
		upvoteButton.classList.add("btn-success");
		downvoteButton.classList.remove("btn-danger");
		downvoteButton.classList.add("btn-outline-danger");
	} else if (code === -1){
		upvoteButton.classList.remove("btn-success");
		upvoteButton.classList.add("btn-outline-success");
	    downvoteButton.classList.remove("btn-outline-danger");
		downvoteButton.classList.add("btn-danger");
	} else{
		console.log("error in handleVote in horrorComicsShow.js")
	}
}
//=========================
//ADD EVENT LISTENER
//=========================
upvoteButton.addEventListener("click", async function() {
	sendVote("up");
})

downvoteButton.addEventListener("click", async function() {
    sendVote("down");
})

wantsToRead.addEventListener("click", async function() {
	addToWantList("user");
})

hasReadButton.addEventListener("click", async function() {
	addToReadList("user")
})