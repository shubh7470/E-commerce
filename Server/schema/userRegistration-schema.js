const mongoose = require('mongoose')

const RegistrationSchema = new mongoose.Schema({
    name: {type: String},
    mobile: { type: Number },
    password:{type: String},
    cpassword : {type:String}


})

const Registration = mongoose.model('Registration',RegistrationSchema);

module.exports = Registration;
