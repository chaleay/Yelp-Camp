var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");

var data =[
    {
        name: "Cloud's Rest",
        image: "https://cdn.pixabay.com/photo/2020/01/14/15/41/landscape-4765322__340.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit tortor quisque facilisis quis fames nisi fermentum est platea dapibus, enim eleifend cubilia habitant erat taciti scelerisque. Dis nascetur facilisi dictum lobortis nibh mollis dictumst neque nunc natoque nec pretium, condimentum senectus iaculis molestie erat metus nisi magnis lectus dapibus augue. Non curabitur integer magna phasellus ornare aliquam augue aptent, eu elementum vitae dis sodales imperdiet viverra gravida, inceptos fames urna proin at a ultrices.Pellentesque torquent porttitor inceptos nisi hac molestie ridiculus donec, porta ut morbi duis proin dictum non montes fermentum, arcu et viverra erat libero blandit felis. Ullamcorper dis dapibus nostra tincidunt risus fames nisi aliquam quis, inceptos ornare cras massa dui pharetra vitae quisque semper, facilisi per hendrerit laoreet ac parturient platea sodales. Diam varius hendrerit dis eros ad phasellus ut quisque nulla, vivamus nunc malesuada arcu pellentesque suspendisse a pretium, aenean vestibulum mi praesent velit aliquet duis penatibus."
    },
    {
        name: "Australia's Final Campground",
        image: "https://cdn.pixabay.com/photo/2017/04/28/16/10/forest-fire-2268729__340.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit tortor quisque facilisis quis fames nisi fermentum est platea dapibus, enim eleifend cubilia habitant erat taciti scelerisque. Dis nascetur facilisi dictum lobortis nibh mollis dictumst neque nunc natoque nec pretium, condimentum senectus iaculis molestie erat metus nisi magnis lectus dapibus augue. Non curabitur integer magna phasellus ornare aliquam augue aptent, eu elementum vitae dis sodales imperdiet viverra gravida, inceptos fames urna proin at a ultrices.Pellentesque torquent porttitor inceptos nisi hac molestie ridiculus donec, porta ut morbi duis proin dictum non montes fermentum, arcu et viverra erat libero blandit felis. Ullamcorper dis dapibus nostra tincidunt risus fames nisi aliquam quis, inceptos ornare cras massa dui pharetra vitae quisque semper, facilisi per hendrerit laoreet ac parturient platea sodales. Diam varius hendrerit dis eros ad phasellus ut quisque nulla, vivamus nunc malesuada arcu pellentesque suspendisse a pretium, aenean vestibulum mi praesent velit aliquet duis penatibus."

    },
    {
        name: "Bernie Sander's Garage",
        image: "https://cdn.pixabay.com/photo/2017/12/10/03/18/balcony-3009152__340.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipiscing elit tortor quisque facilisis quis fames nisi fermentum est platea dapibus, enim eleifend cubilia habitant erat taciti scelerisque. Dis nascetur facilisi dictum lobortis nibh mollis dictumst neque nunc natoque nec pretium, condimentum senectus iaculis molestie erat metus nisi magnis lectus dapibus augue. Non curabitur integer magna phasellus ornare aliquam augue aptent, eu elementum vitae dis sodales imperdiet viverra gravida, inceptos fames urna proin at a ultrices.Pellentesque torquent porttitor inceptos nisi hac molestie ridiculus donec, porta ut morbi duis proin dictum non montes fermentum, arcu et viverra erat libero blandit felis. Ullamcorper dis dapibus nostra tincidunt risus fames nisi aliquam quis, inceptos ornare cras massa dui pharetra vitae quisque semper, facilisi per hendrerit laoreet ac parturient platea sodales. Diam varius hendrerit dis eros ad phasellus ut quisque nulla, vivamus nunc malesuada arcu pellentesque suspendisse a pretium, aenean vestibulum mi praesent velit aliquet duis penatibus."
        

    }
];


function seedDB(){
    //remove all campgrounds from collection
    
    Comment.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log('removing comments...');
            Campground.deleteMany({}, function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("removed campgrounds");
                     //add a few campgrounds
                     
                     data.forEach(function(seed){
                    //create adds entry to collection
                        Campground.create(seed, function(err, data){
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    console.log("added campground " + data.name);
                                    //create a comment
                                    /*
                                    Comment.create(
                                        {
                                    
                                            text: "I like " + data.name + ". Cool place with lots of chill people",
                                            author: "LoveMan69"
                                        }, function(err, comment){
                                            if(err){
                                                console.log(err)
                                            }
                                            else{
                                                data.comments.push(comment);
                                                data.save();
                                                console.log("created a new comment and attached it to the " + data.name + " campground");
                                            }
                                        });
                                     */
                                    }
                                
                                });
                            });
                         
                        }
                });
        }
    }); 
    
    

}

//name of the module to execute in app
module.exports = seedDB;
