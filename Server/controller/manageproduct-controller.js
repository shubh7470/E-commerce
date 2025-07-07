const mongoose = require('mongoose')

const Product = require('../schema/insertproduct-schema.js');

const manageProduct = async(req,res)=>{
    try{

        const Manage = await Product.find()  
        res.status(200).json(Manage)

    }catch(error)
    {
        console.log("Error while fetching the Data form Databses",error)
    }

}

const getProductById = async(req,res) =>{
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }
    try{
        console.log("Request ID:", req.params.id); 
        const productbyid = await Product.findById(req.params.id)
         if (!productbyid) return res.status(404).json({ message: "Product not found" });
         res.status(200).json(productbyid)

    }catch(error){
          console.log("Error while fetching the Data form Databses",error)
    }
}

const deleteProduct = async(req,res)=>{
    try{
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.status(200).json({message : 'Product Delete Successfully'});
    } catch (error){
        res.status(500) .json ({ error :'Something went wrong whikle Deleting Product'});

    }

}


const updateProduct  = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Error while updating product' });
    }
};
module.exports = { manageProduct,getProductById,deleteProduct,updateProduct }
