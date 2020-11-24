//=========================
//SELECT ELEMENTS
//=========================
const upvoteButton=document.getElementById("upvoteButton");
const downvoteButton=document.getElementById("downvoteButton");


//=========================
//ADD EVENT LISTENER
//=========================
upvoteButton.addEventListener("click", async function() {
	//build fetch options
	const options = {
		method: "POST",
		headers:{
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({vote:"up"})
	}
	//send fetch request
})

downvoteButton.addEventListener("click", async function() {
	//build fetch options
	//send fetch requests
})