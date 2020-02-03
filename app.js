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

//run this set method before connection?
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
//set the directory where we serve files from 
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//exec
seedDB();


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


//landing
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
                res.render("campgrounds/index", {campgrounds: allCampgrounds})
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
    res.render("campgrounds/new");

});


//this needs to go below new route
//SHOW - SHOWS MORE INFO about campground
app.get("/campgrounds/:id", function(req, res){
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

// ====== 
//  Comments Route
// ======

//new route
app.get("/campgrounds/:id/comments/new", IsLoggedIn, function(req, res){
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


app.post("/campgrounds/:id/comments", IsLoggedIn, function(req, res){
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


//Auth Routes //

//show register form
app.get("/register", function(req, res){
    res.render("register");
});

//handle sign up logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});


//show login form
app.get("/login", function(req, res){
    res.render("login");
});

//handle login logic
app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
    
    }), function(req, res){

});

//handle logout req
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/campgrounds');
});


function IsLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

//LISTEN
app.listen(3000, function(){
    console.log("Yelp Camp Has Started");
});