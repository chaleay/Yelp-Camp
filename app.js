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
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);


/*
Campground.create(
    {
        name: "Gayass Creek",
        image: "https://cdn.pixabay.com/photo/2017/09/26/13/50/rv-2788677__340.jpg",
        description: "This a huge pile of shit campsite with a really small dick.."

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

//INDEX ROUTE 
app.get('/campgrounds', function(req, res){
       
       Campground.find({}, function(err, allCampgrounds){
            if(err){
                console.log(err);
            }
            else{
                res.render("index", {campgrounds: allCampgrounds})
            }
       });
       // res.render('campgrounds', {campgrounds: campgrounds}) 
});

//follow REST - here you can create a new campground
//NOTE: get req data from post - req.body, get req data from get - req.query

//CREATE ROUTE -- add new campground to database
app.post("/campgrounds", function(req, res){
    //get data from form
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    //create new campground object
    var newcampground = {
        name: name,
        image: image,
        description: description
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

//NEW ROUTE
//show the form that sends data to post route
app.get('/campgrounds/new', function(req, res){
    res.render("new");

});


//this needs to go below new route
//SHOW - SHOWS MORE INFO about campground
app.get("/campgrounds/:id", function(req, res){
    //find campground with provided id
    //req.params will return parameters in the matched route.
    var id = req.params.id;
    
    Campground.findById(id, function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render('show', {campground: foundCampground});
        }
    });
  
});

app.listen(3000, function(){
    console.log("Yelp Camp Has Started");
});