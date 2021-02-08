const   mongoose = require("mongoose"),
        passportLocalMongoose = require("passport-local-mongoose");

let cardSchema = new mongoose.Schema({
    name: String,
    imgurl: String,
    decs1: String,
    decs2: String,
    author: {
        id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
        },
        username: String
    },
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }
    ]
});

cardSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("onePeice", cardSchema);