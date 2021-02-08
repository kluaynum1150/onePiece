const express = require("express"),
      router = express.Router({mergeParams: true}),
      card = require("../models/bountyLeaflet"),
      comment = require("../models/comment"),
      middleware = require("../middleware");

router.post("/", middleware.isLoggedin, function(req,res){
    card.findById(req.params.id, function(err,card){
        if(err){
            console.log(err);
            res.redirect("/BountyLeaflet");
        } else{
            comment.create(req.body.comment, function(err,comment){
                if(err){
                    console.log(err);
                } else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    card.comment.push(comment);
                    card.save();
                    res.redirect("/BountyLeaflet/" + card._id);
                }
            });
        }
    });
});

router.get("/new", middleware.isLoggedin, function(req,res){
    //console.log(req.params.id);
    card.findById(req.params.id, function(err,card){
        if(err){
            console.log(err);
        } else{
            res.render("comment/new",{card:card});
        }
    });
});

router.get("/:comment_id/edit", middleware.checkCommentOwnership,function(req,res){
    comment.findById(req.params.comment_id, function(err,foundComment){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            res.render("./comment/edit", {card_id:req.params.id,comment:foundComment});
        }
    });
});

router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,updatedComment){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/BountyLeaflet/"+req.params.id);
        }
    });
});

router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/BountyLeaflet/"+req.params.id);
        }
    });
});

module.exports = router;