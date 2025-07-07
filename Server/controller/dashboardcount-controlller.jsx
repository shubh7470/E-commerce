const Order = require('../schema/payment-schema.js');
const Product = require('../schema/insertproduct-schema.js');
const User = require('../schema/userRegistration-schema.js');

const getOrderStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const confirmedOrders = await Order.countDocuments({ status: 'Confirmed' }); 
    const activeUsers = await User.countDocuments(); 
    const totalProducts = await Product.countDocuments();

    const productsSold = await Order.aggregate([
      { $group: { _id: null, total: { $sum: 1 } } } 
    ]);
    const totalSold = productsSold[0]?.total || 0;

    const sellerCount = 0; 

    res.status(200).json({
      totalOrders,
      confirmedOrders,
      activeUsers,
      totalProducts,
      productsSold: totalSold,
      sellerCount
    });
  } catch (err) {
    console.error('Admin stats error:', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};
const getTotalRevenue = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" }
        }
      }
    ]);

    const totalRevenue = result[0]?.totalRevenue || 0;
    res.status(200).json({ totalRevenue });
  } catch (err) {
    console.error("Error calculating total revenue:", err);
    res.status(500).json({ error: "Failed to calculate total revenue" });
  }
};

module.exports = { getOrderStats ,getTotalRevenue };
