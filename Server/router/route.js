const express = require('express')
const Product = require('../schema/insertproduct-schema.js')
const multer = require('multer')
const jwt = require('jsonwebtoken');
const adminlogin = require('../schema/adminlogin-schema.js')
const router = express.Router()
const { manageProduct,deleteProduct,updateProduct} = require('../controller/manageproduct-controller.js');
const { getProductById } = require('../controller/manageproduct-controller.js');
const {Register,LogUser} = require('../controller/registration-controller.js');
const Registration = require('../schema/userRegistration-schema.js');
const bcrypt = require('bcryptjs');
const {AddtoCart, getCart,deleteCartItem,updateCartQuantity } = require('../controller/addtocart-controller.jsx')
const { saveAddress,getAddressByMobile } = require('../controller/address-controller.js');
const { RazorOrder,OrderSave, deleteOrder } = require('../controller/payment-controller.js')
const { getOrderStats, getTotalRevenue } = require('../controller/dashboardcount-controlller.jsx');

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'uploads')
    },
    filename : function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload = multer({storage: storage})

router.post('/insertproduct', upload.fields([
  { name: 'frontimage', maxCount: 1 },
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 }
]),async(req,res)=>{
    try{
        const files = req.files;
        const product = new Product({
            pname: req.body.pname,
            category: req.body.category,
            aprice: req.body.aprice,
            dprice: req.body.dprice,
            rating: req.body.rating,
            description: req.body.description,
            frontimage: files['frontimage'] ? files['frontimage'][0].filename : '',
            image1: files['image1'] ? files['image1'][0].filename : '',
            image2: files['image2'] ? files['image2'][0].filename : ''
        })
        await product.save();
        res.status(201).json("Data Inserted")

    }catch(error){
        console.log("Error while Uploading data backend side",error)
    }
})

router.post('/adminlogin', async (req, res) => {
  const { username, password } = req.body;

  console.log("Request Body:", req.body);

  const user = await adminlogin.findOne({ username }); 

  console.log("User from DB:", user);

  if (!user) return res.status(404).json({ error: 'Invalid Username and Password' });

  if (user.password !== password)
    return res.status(400).json({ error: 'Invalid Username and Password' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ message: 'Login successful', token });
});

router.post('/userlogin', async (req, res) => {
  const { Mobile, password } = req.body;

  try {
    const user = await Registration.findOne({ mobile: Mobile }); // ✅ lowercase
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid password");
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log("Login successful");

    res.status(200).json({
      message: 'Login successful',
      token,
      name: user.name,
      mobile: user.mobile
    });

  } catch (err) {
    console.log("Server error:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/Manage',manageProduct)
router.get('/logUser',LogUser)

router.get('/product/:id',getProductById)
router.post('/register', Register)
router.post('/cart/add', AddtoCart)
router.get('/cart/:mobile', getCart)
router.delete('/delete/:mobile/:productId', deleteCartItem);
router.put('/update/:mobile', updateCartQuantity);
router.post('/address', saveAddress);
router.get('/address/:mobile', getAddressByMobile);
router.post('/payment/order', RazorOrder);
router.post('/order',OrderSave);
router.delete('/cart/clear/:mobile',deleteOrder);
router.get('/order/stats',getOrderStats);
router.get('/order/revenue', getTotalRevenue);
router.delete('/product/:id', deleteProduct);
router.put('/product/:id', upload.fields([
    { name: 'frontimage', maxCount: 1 },
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 }
]), updateProduct);
module.exports = router