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

//edit route
router.get("/:comment_id/edit", CheckCommentOwnership, function(req, res){
    
        
   Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.render("comments/edit", {comment: foundComment, campground_id: req.params.id}); //pass in campground id
        }
    });
});


//UPATE ROUTE
router.put("/:comment_id", CheckCommentOwnership, function(req, res){
    
    var editedComment = req.body.comment;
    //find and update campground by given id
    Comment.findByIdAndUpdate(req.params.comment_id, editedComment, function(err, foundComment){
        if(err){
            res.redirect("/campgrounds");
            console.log("err encountered... " + '\n' + err);
        }
        else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//delete route 
router.delete("/:comment_id", function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
         res.redirect("/campgrounds/" + req.params.id);
    });
 });

function CheckCommentOwnership(req, res, next){
    if(req.isAuthenticated()){
        //check comment ownership
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.send("Error: Couldn't find comment.");
            }
            else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.redirect("back");
                    console.log("You don't have permission to that.");  
                }
            }
        });
    }
    else{
        res.redirect("back");
    }
}


 //middleware
 function IsLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;