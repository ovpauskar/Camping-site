var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment   = require("./models/comment"),
    seedDB     = require("./seeds")
   
    
seedDB();

mongoose.connect("mongodb://localhost/yelp_camp_v3");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs" );


// Campground.create({
//     name: "Mt. Kailash", 
//     image:"https://i.ytimg.com/vi/bTiWqPhRZpw/hqdefault.jpg",
//     description: "Awesome Devine Mountain. Has too much value in vedic scriptures"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else{
//             console.log("We have created a new campground");
//             console.log(campground);
//         }
    
// });



app.get("/", function(req,res){
   res.render("landing"); 
});

//INDEX Route  -- Show all Campgrounds
app.get("/campgrounds", function(req, res){
    // GET ALL THE CAMPGROUNDS FROM DB
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index",{abcd:allcampgrounds});
        }
    });
  });
  

//CREATE Roue -- Add new Campground to DB
app.post("/campgrounds", function(req, res){
 var name = req.body.name;
 var image = req.body.image;
 var desc = req.body.description;
 var newCampground = {name: name, image: image, description: desc};
 //CREATE A NEW CAMPGROUND & SAVE TO DB
 Campground.create(newCampground, function(err, newlyadded){
     if(err){
         console.log(err);
     } else{
         console.log("New campground added to DB");
         console.log(newlyadded);
         //REDIRECT TO /CAMPGROUNDS
         res.redirect("/campgrounds");
     }
 });
 
 
 
});

//NEW -- Shows form to create a new Campground
app.get("/campgrounds/new", function(req,res){
   res.render("campgrounds/new"); 
});


// SHOW -- Show more info about one Campground
app.get("/campgrounds/:id", function(req, res){
    // Find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else {
            console.log(foundCampground);
    //Render the show template with that background
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//====================
//COMMENTS CREATION 
//====================
app.get("/campgrounds/:id/comments/new", function(req, res){
    
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
             }
         else{
             res.render("comments/new", {campground: campground});
            }
    });
});

app.post("/campgrounds/:id/comments", function(req,res){
    Campground.findById(req.params.id, function(err,campground){
        if(err){ console.log(err);}
        else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){console.log(err);}
                else{ 
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+ campground._id);
                }
            });
        }
    });
    
});

app.listen(process.env.PORT, process.env.ID, function(){
    console.log("YelpCamp Server has started!");
});