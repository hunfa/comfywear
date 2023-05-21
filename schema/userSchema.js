const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }


});
mongoose.models = {};
module.exports = mongoose.model("user", UserSchema);