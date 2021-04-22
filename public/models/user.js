const mongoose = require('mongoose');
const Posts = require('./post')
const Schema = mongoose.Schema;

var onlineState = ['Online', 'Offline', 'Away'];

//create data structure
const userSchema = new Schema({
    userName: {
        type: String,
    },
    googleId: {
        type: String,
    },
    password: {
        type: String,
        hidden: true

    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    dateOfBirth: {
        type: Date,
    },
    bio: {
        type: String,
        default: ''
    },
    posts: {
        type: Array,
        default: []
    },
    state: {
        type: String,
        enum: onlineState
    }

}, {timestamps: true}); //auto place timestamps on entries

//create model to communicate with database collection
//mongoose.model(name, schema)
const User = mongoose.model('User', userSchema);

module.exports = User;