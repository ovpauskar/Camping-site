var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {name:"THE BEAUTY",
     image:"https://n6-img-fp.akamaized.net/free-photo/blue-mountains-famous-tourism-scenery-lijiang_1417-1143.jpg?size=338&ext=jpg",
     description: "The history of theatrical scenery is as old as the theatre itself, and just as obtuse and tradition bound. What we tend to think of as 'traditional scenery', i.e. two-dimensional canvas-covered 'flats' painted to resemble a three-dimensional surface or vista, is a relatively recent innovation and a significant departure from the more ancient forms of theatrical expression, which tended to rely less on the actual representation of space senerial and more on the conveyance of action and mood. By the Shakespearean era, the occasional painted backdrop or theatrical prop was in evidence, but the show itself was written so as not to rely on such items to convey itself to the audience. However, this means that today's set designers must be that much more careful, so as to convey the setting without taking away from the actors."},
     
     {name:"THE ROAD",
     image:"https://55a.info/common/img/contents/canadaweather/canadaweather-1.jpg",
     description: "The history of theatrical scenery is as old as the theatre itself, and just as obtuse and tradition bound. What we tend to think of as 'traditional scenery', i.e. two-dimensional canvas-covered 'flats' painted to resemble a three-dimensional surface or vista, is a relatively recent innovation and a significant departure from the more ancient forms of theatrical expression, which tended to rely less on the actual representation of space senerial and more on the conveyance of action and mood. By the Shakespearean era, the occasional painted backdrop or theatrical prop was in evidence, but the show itself was written so as not to rely on such items to convey itself to the audience. However, this means that today's set designers must be that much more careful, so as to convey the setting without taking away from the actors."},
     
     {name:"THE BEACH",
     image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHQ6zfDQWU3zdd_XI3_-9ao3DTw5bRmBFV28vv_CT2l-PAsW_W",
     description: "The history of theatrical scenery is as old as the theatre itself, and just as obtuse and tradition bound. What we tend to think of as 'traditional scenery', i.e. two-dimensional canvas-covered 'flats' painted to resemble a three-dimensional surface or vista, is a relatively recent innovation and a significant departure from the more ancient forms of theatrical expression, which tended to rely less on the actual representation of space senerial and more on the conveyance of action and mood. By the Shakespearean era, the occasional painted backdrop or theatrical prop was in evidence, but the show itself was written so as not to rely on such items to convey itself to the audience. However, this means that today's set designers must be that much more careful, so as to convey the setting without taking away from the actors."}
    ];

function seedDB(){
    //Remove all campgrounds
        Campground.remove({}, function(err){
            if(err){
                console.log(err);
            }
            console.log("Campgrounds removed");
        });

    // add a few campgrounds
        data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
                if(err)
                {console.log(err);}
                else
                {  console.log("added a campground");
                    
    // create a comment
                Comment.create({
                   text:"This place is great but I wish there was internet", 
                   author:"Iron Man"
                    }, function(err, comment){
                        if(err){console.log(err);}
                        else{
                          campground.comments.push(comment);
                          campground.save();
                           console.log("created new comment");
                        }
                    });
                    
                }
                  
                });
        });
}





module.exports = seedDB;