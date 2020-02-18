//reqs
var express       = require('express'),
    app           = express(),
    request       = require('request'),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require('passport'),
    LocalStrategy = require('passport-local'),
    //import our schema
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB =      require("./seeds")


var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")


//run this set method before connection?
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
//set the directory where we serve files from 
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//exec - seed db with predefined materials
//seedDB();


//passport config
app.use(require("express-session")({
    secret: "Congrats on logging in...",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//pass user to templates
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//set up router and acquire routes
app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);


/*
Campground.create(
    {
        name: "Cheek Creek",
        image: "https://cdn.pixabay.com/photo/2017/09/26/13/50/rv-2788677__340.jpg",
        description: "The cheeks on this creek are amazing!"

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










//LISTEN
app.listen(3000, function(){
    console.log("Yelp Camp Has Started");
});