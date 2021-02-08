const   card = require("../models/bountyLeaflet"),
        comment = require("../models/comment");

let middlewareObj = {};

middlewareObj.checkCardOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        card.findById(req.params.id, function(err,foundCard){
            if(err){
                res.redirect("back");
            } else{
                if(foundCard.author.id.equals(req.user._id)){
                    next();
                } else{
                    res.redirect("back");
                }
            }
        });
    } else{
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        comment.findById(req.params.comment_id, function(err,foundComment){
            if(err){
                res.redirect("back");
            } else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else{
                    res.redirect("back");
                }
            }
        });
    } else{
        res.redirect("back");
    }
}

middlewareObj.isLoggedin = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to login first');
    res.redirect("/login");
}

module.exports = middlewareObj;