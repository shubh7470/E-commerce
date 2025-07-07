const mongoose = require('mongoose');

const adminloginSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

const adminlogin = mongoose.model('adminlogin', adminloginSchema, 'adminlogin'); // <== fixed here
module.exports = adminlogin;
