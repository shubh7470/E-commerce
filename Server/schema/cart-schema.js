// models/cart.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  mobile: { type: Number, required: true },
  name: { type: String, required: true },
  items: [
    {
      productId:{ type: String, required: true },
      pname: String,
      dprice: Number,
      aprice:Number,
      image: String,
      quantity: { type: Number, default: 1 },
    }
  ]
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
