const mongoose = require('mongoose');
let UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    destination: String,
    travelers: Number,
    budget:Number
})

const UserModel = mongoose.model('User', UserSchema);
module.exports = {
    UserModel
}