var mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName:{
        type: String,
        require: true
    },
    lastName : {
        type: String,
        require: true
    },
    email : {
        type: String,
        require:true
    }
})

const user = module.exports = mongoose.model('users', UserSchema);
