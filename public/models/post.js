const mongoose = require('mongoose');
const userModel = require('./user');
const Schema = mongoose.Schema;

//create data structure
const postSchema = new Schema({
    //Title of post
    title: {
        type: String,
        required: true,
        trim: true
        
    },
    //content of post
    body: {
        type: String,
        required: true

    },
    //creator of post
    author: {
        type: String
    },
    //total likes/dislikes
    points: {
        type: Number,
        default: 0
    },
    //Users who liked the post
    likes: {
        type: Array,
        default: []
    },
    comments: {
        type: [String],
        default: []
    }


}, {timestamps: true}); //auto place timestamps on entries

//create model to communicate with database collection
//mongoose.model(name, schema)
const Post = mongoose.model('Post', postSchema);

module.exports = Post;