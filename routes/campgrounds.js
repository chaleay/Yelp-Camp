
var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");


//INDEX ROUTE 
router.get('/', function(req, res){
    console.log(req.user);
    Campground.find({}, function(err, allCampgrounds){
         if(err){
             console.log(err);
         }
         else{
             res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user})
         }
    });
    // res.render('campgrounds', {campgrounds: campgrounds}) 
});

//follow REST - here you can create a new campground
//NOTE: get req data from post - req.body, get req data from get - req.query

//CREATE ROUTE -- add new campground to database
router.post("/", IsLoggedIn, function(req, res){
    //get data from form
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    //create new campground object
    var newcampground = {
        name: name,
        image: image,
        description: description,
        author: author
    };
        
        //save to db, redirect back to campgrounds page if successful
        Campground.create(newcampground, function(err, createdCampground){
            if(err){
                console.log(err);
            }
            else{
                //add user info to campground, then save
            
                res.redirect('/campgrounds');
            }

        });
        
    });

//NEW ROUTE
//show the form that sends data to post route
router.get('/new', IsLoggedIn, function(req, res){
 res.render("campgrounds/new");

});


//this needs to go below new route
//SHOW - SHOWS MORE INFO about campground
router.get("/:id", function(req, res){
 //find campground with provided id
 //req.params will return parameters in the matched route.
 var id = req.params.id;
 
 Campground.findById(id).populate("comments").exec(function(err, foundCampground){
     if(err){
         console.log(err);
     }
     else{
         console.log(foundCampground);
         res.render('campgrounds/show', {campground: foundCampground});
     }
 });

});

//edit route
router.get("/:id/edit", CheckCampgroundOwnership, function(req, res){
    
        
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

//update route
router.put("/:id", CheckCampgroundOwnership, function(req, res){

    var editedCampground = req.body.campground;
    //find and update campground by given id
    Campground.findByIdAndUpdate(req.params.id, editedCampground, function(err, foundCampground){
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
router.delete("/:id", function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
        res.redirect("/campgrounds");
   });
});


//middleware function
function IsLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}


//middleware
function CheckCampgroundOwnership(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                  res.redirect("back");
            }
            else{
                  if(foundCampground.author.id.equals(req.user._id)){
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

module.exports = router;