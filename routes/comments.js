var express = require("express")
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground")
var Comment = require("../models/comment")
// ====== 
//  Comments Route
// ======

//new route
router.get("/new", IsLoggedIn, function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new", {campground: foundCampground});
        }
    });
    
});


router.post("/", IsLoggedIn, function(req, res){
    //lookup campground by id
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else
        {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }
                else{
                    //add username and id to comment, save comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    console.log("CURRENT USERNAME IS " + req.user.username)
                    comment.save();
                    //add comment to campground
                    foundCampground.comments.push(comment);
                    foundCampground.save();
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            });
        }
    });
    //create new comment, connect new comment to campground
    //redirect campground
    
});

function IsLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;