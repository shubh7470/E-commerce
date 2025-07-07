const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    pname: { type: String },
    category: { type: String },
    aprice: { type: Number },
    dprice: { type: Number },
    rating: { type: Number },
    frontimage: { type: String },
    image1: { type: String },
    image2: { type: String },
    description: { type: String }

})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;