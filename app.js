//reqs
var express = require('express'),
    app = express(),
    request = require('request'),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);


/*
Campground.create(
    {
        name: "Brokeback Creek",
        image: "https://cdn.pixabay.com/photo/2017/09/26/13/50/rv-2788677__340.jpg"

    }, function(err, campground){
        if(err){
            console.log(err);
        }
        else{
            console.log("Created a new campground!");
            console.log(campground);
        }
    });
*/

/* array
var campgrounds = 
[
    {name: "Brokeback creek", image: "https://cdn.pixabay.com/photo/2017/09/26/13/50/rv-2788677__340.jpg"},
    {name: "The Drag", image: "https://cdn.pixabay.com/photo/2015/07/09/01/59/picnic-table-837221__340.jpg"},
    {name: "Cucc Camper", image: "https://cdn.pixabay.com/photo/2016/04/28/15/49/airstream-1359135__340.jpg"},
    {name: "Brokeback creek", image: "https://cdn.pixabay.com/photo/2017/09/26/13/50/rv-2788677__340.jpg"},
    {name: "The Drag", image: "https://cdn.pixabay.com/photo/2015/07/09/01/59/picnic-table-837221__340.jpg"},
    {name: "Cucc Camper", image: "https://cdn.pixabay.com/photo/2016/04/28/15/49/airstream-1359135__340.jpg"},
    {name: "Brokeback creek", image: "https://cdn.pixabay.com/photo/2017/09/26/13/50/rv-2788677__340.jpg"},
    {name: "The Drag", image: "https://cdn.pixabay.com/photo/2015/07/09/01/59/picnic-table-837221__340.jpg"},
    {name: "Cucc Camper", image: "https://cdn.pixabay.com/photo/2016/04/28/15/49/airstream-1359135__340.jpg"}
];
*/

app.get('/', function(req,res){
    res.render('landing');
});

app.get('/campgrounds', function(req, res){
       
       Campground.find({}, function(err, allCampgrounds){
            if(err){
                console.log(err);
            }
            else{
                res.render("campgrounds", {campgrounds: allCampgrounds})
            }
       });
       // res.render('campgrounds', {campgrounds: campgrounds}) 
});

//follow REST - here you can create a new campground
//NOTE: get req data from post - req.body, get req data from get - req.query

app.post("/campgrounds", function(req, res){
    //get data from form
    var name = req.body.name;
    var img = req.body.image;
    
    //create new campground object
    var newcampground = {
        name: name,
        image: img
    };
    
    //save to db, redirect back to campgrounds page if successful
    Campground.create(newcampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            res.redirect('/campgrounds');
        }

    });
    
});

//show the form that sends data to post route
app.get('/campgrounds/new', function(req, res){
    res.render("new");

});

app.listen(3000, function(){
    console.log("Yelp Camp Has Started");
});