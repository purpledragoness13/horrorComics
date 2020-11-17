const express = require('express');
const router = express.Router();
const isLoggedIn= require('../utils/isLoggedIn.js');

router.get("/", (req,res) => {
	res.render("landing");
});

router.get("/account",(req,res)=> {
	res.render("account");
});


module.exports = router;