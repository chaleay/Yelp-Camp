//reqs
var express = require('express');
var app = express();
var request = require('request');

app.set("view engine", "ejs");

app.get('/', function(req,res){
    res.render('landing');
});

app.get('/campgrounds', function(req, res){
        var campgrounds = 
        [
            {name: "Brokeback creek", image: "https://pixabay.com/get/50e9d4474856b108f5d084609620367d1c3ed9e04e50744e73287bd7954ac0_340.jpg"},
            {name: "The Drag", image: "https://pixabay.com/get/57e8d3444855a914f6da8c7dda793f7f1636dfe2564c704c72297cd4944fc25d_340.jpg"},
            {name: "Cucc Camper", image: "https://pixabay.com/get/52e3d3404a55af14f6da8c7dda793f7f1636dfe2564c704c72297cd4944fc25d_340.png"}
        ];

        res.render('campgrounds', {campgrounds: campgrounds}) //first refers to what var is called on ejs page, second refers to what we pass in
});

app.listen(3000, function(){
    console.log("Yelp Camp Has Started");
});