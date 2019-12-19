//reqs
var express = require('express');
var app = express();
var request = require('request');

app.get('/', function(req,res){
    res.send("this will be the landing page soon!");

});


app.listen(3000, function(){
    console.log("Yelp Camp Has Started");
});