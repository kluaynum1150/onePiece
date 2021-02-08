const express = require("express"),
      passport = require("passport"),
      router = express.Router(),
      user = require("../models/user");

router.get("/", function(req, res){
    res.render("landing");
});

router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login", passport.authenticate("local",{
    successRedirect: "/BountyLeaflet",
    failureRedirect: "login",
    successFlash: true,
    failureFlash: true,
    successFlash: "Successfully log in!",
    failureFlash: "Invaid username or password!"
}), function(req, res){  
});

router.get("/logout", function(req, res){
    req.logOut();
    req.flash('success','You log out successfully');
    res.redirect("/");
});

router.get("/signup", function(req, res){
    res.render("signup");
});

router.post("/signup", function(req, res){
    user.register(new user({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("signup");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash('success','Welcome to Bounty Leaflet, ' + user.username);
            res.redirect("/BountyLeaflet");
        });
    });
});

module.exports = router;