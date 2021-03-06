//schema setup
var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"

        },
        username: String,
    },
    //associate comment with id
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            //ref must match name of collection?
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Campground", campgroundSchema);