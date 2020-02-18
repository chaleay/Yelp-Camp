var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    text: String,
    author:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User" //refers to name of model we refer to
        },
        username: String

    }
});

module.exports = mongoose.model("Comment", commentSchema);