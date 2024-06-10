
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sushen:Kuber%401180@cluster0.j6hlfsw.mongodb.net/Linkedin');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String
});

const AdminSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    role: {
        type: String,
        default: 'admin'
      }

})

const eCardSchema = new mongoose.Schema({
    name: String,
    description: String,
    interest: Object,
    linkedIn: String,
    twitter: String
})


const eCard = mongoose.model('eCard', eCardSchema);
const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
    eCard,
    Admin,
    User
}






