const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  pincode: String,
  locality: String,
  address: String,
  city: String,
  state: String,
  landmark: String,
  altPhone: String,
  addressType: String,
  priceDetails: {
    totalOriginal: Number,
    totalDiscount: Number,
    coupon: Number,
    platformFee: Number,
    total: Number
  }
});

module.exports = mongoose.model('Address', addressSchema);
