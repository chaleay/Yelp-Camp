//reqs
var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require("body-parser");



app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//array
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

app.get('/', function(req,res){
    res.render('landing');
});

app.get('/campgrounds', function(req, res){
        //first refers to what var is called on ejs page, second refers to what we pass in
        res.render('campgrounds', {campgrounds: campgrounds}) 
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
    
    //push it onto array
    campgrounds.push(newcampground);
    res.redirect('/campgrounds');
});

//show the form that sends data to post route
app.get('/campgrounds/new', function(req, res){
    res.render("new");

});

app.listen(3000, function(){
    console.log("Yelp Camp Has Started");
});