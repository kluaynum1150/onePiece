const express = require("express"),
      router = express.Router(),
      multer = require("multer"),
      path = require("path"),
      fs = require("fs"),
      card = require("../models/bountyLeaflet"),
      middleware = require("../middleware");

//ที่เก็บรูป
const storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: function(req, file, cb){
        cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

//เช็คนามสกุลของรูป
const imageFilter = function(req, file, cb){
    var ext = path.extname(file.originalname);
    if(ext !== ".png" && ext !== ".gif" && ext !== ".jpg" && ext !== ".jpeg"){
        return cb(new Error("Only image is allowed."),false);
    }
    cb(null, true);
}

//เรียกใช้
const upload = multer({storage: storage, fileFilter: imageFilter});

router.get("/",middleware.isLoggedin,function(req, res){
    card.find({},function(error,allCard){
        if(error){
            console.log("ERROR!");
        } else{
            res.render("./card/cardList",{card:allCard});
        }
    })
});

//add new card
router.post("/",middleware.isLoggedin,upload.single("image"),function(req, res){
    let n_name = req.body.name;
    let n_image = req.file.filename;
    let n_decs1 = req.body.decs1;
    let n_decs2 = req.body.decs2;
    let n_author = {
        id: req.user._id,
        username: req.user.username
    };
    let n_card = {name:n_name,imgurl:n_image,decs1:n_decs1,decs2:n_decs2,author:n_author};
    card.create(n_card,function(error,newCard){
        if(error){
            console.log("ERROR d!!");
        }else{
            console.log("New card added");
            res.redirect("/BountyLeaflet");
        }
    });
});

router.get("/new",middleware.isLoggedin,function(req, res){
    res.render("./card/addNewCard");
});

router.get("/:id",middleware.isLoggedin,function(req,res){
    card.findById(req.params.id).populate("comment").exec(function(error,idCard){
        if(error){
            console.log("ERROR!");
        }else{
            res.render("./card/showdetails",{card:idCard});
        }
    });
});

router.get("/:id/edit", middleware.checkCardOwnership, function(req,res){
    card.findById(req.params.id, function(err,foundCard){
        if(err){
            console.log(err);
        } else {
            res.render("./card/edit", {card:foundCard});
        }
    });
});

//edit card
router.put("/:id",middleware.checkCardOwnership, upload.single("image"),function(req,res){
    let n_name = req.body.name;
    let n_decs1 = req.body.decs1;
    let n_decs2 = req.body.decs2;
    if(req.file){
        let n_image = req.file.filename;
        card.findById(req.params.id, function(err,foundCard){
            if(err){
                res.redirect("/BountyLeaflet");
            } else{
                const imagePath = "./public/uploads/" + foundCard.imgurl;
                fs.unlink(imagePath, function(err){
                    if(err){
                        console.log(err);
                        res.redirect("/BountyLeaflet");
                    }
                });
            }
        });
        var n_card = {name:n_name,imgurl:n_image,decs1:n_decs1,decs2:n_decs2};
    } else{
        var n_card = {name:n_name,decs1:n_decs1,decs2:n_decs2};
    }
    card.findByIdAndUpdate(req.params.id, n_card, function(err,updated){
        if(err){
            console.log(err);
            res.redirect("/BountyLeaflet");
        } else {
            res.redirect("/BountyLeaflet/"+req.params.id);
        }
    });
});

//ลบการ์ด
router.delete("/:id",middleware.checkCardOwnership,function(req,res){
    card.findById(req.params.id, function(err,foundCard){
        if(err){
            res.redirect("/BountyLeaflet");
        } else{
            const imagePath = "./public/uploads/" + foundCard.imgurl;
            fs.unlink(imagePath, function(err){
                if(err){
                    console.log(err);
                    res.redirect("/BountyLeaflet");
                }
            });
        }
    });
    card.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect("/BountyLeaflet");
        } else {
            res.redirect("/BountyLeaflet");
        }
    });
});

module.exports = router;