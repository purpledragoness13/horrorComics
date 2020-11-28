//=========================
//SELECT ELEMENTS
//=========================
const upvoteButton=document.getElementById("upvoteButton");
const downvoteButton=document.getElementById("downvoteButton");

//=========================
//HELPER FUNCTIONS
//=========================
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
	await fetch("/horrorComics/vote",options) 
	.then(data => {
		return data.json()
	})
	.then(res =>{
		console.log(res)
	})
	.catch(err => {
		console.log(err);
	})
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