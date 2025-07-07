const Registration = require('../schema/userRegistration-schema.js');
const bcrypt = require('bcryptjs');

const Register = async (req, res) => {
  try {
    const { name, mobile, password, cpassword } = req.body;

    // 1. Validate passwords match
    if (password !== cpassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // 2. Check if mobile already exists
    const existingUser = await Registration.findOne({ mobile });
if (existingUser) {
  return res.status(409).json({ error: "Mobile number already registered" });
}

    // 3. Hash passwords
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Save new user
    const registration = new Registration({
      name,
      mobile,
      password: hashedPassword,
      cpassword: hashedPassword, // Not needed separately
    });

    await registration.save();
    return res.status(201).json("Registration Successful");

  } catch (error) {
    console.log("❌ Error while Registration:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};
const LogUser = async(req,res)=>{
    try{

        const Manage = await Registration.find()  
        res.status(200).json(Manage)

    }catch(error)
    {
        console.log("Error while fetching the Data form Databses",error)
    }

};

module.exports = { Register,LogUser };
