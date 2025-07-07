const Cart = require('../schema/cart-schema.js');

const AddtoCart = async (req, res) => {
  const { mobile, name, product } = req.body;
  console.log('Cart add request:', req.body);
  try {
    let cart = await Cart.findOne({ mobile });

    const newItem = {
      productId: (product._id || product.id || product.productId).toString(),
      pname:product.pname,
      dprice: product.dprice,
      aprice: product.aprice,
      image: product.image,
      quantity: 1
    };

    if (!cart) {
       console.log("Creating new cart");
      cart = new Cart({ mobile, name, items: [newItem] });
    } else {
      const existingItem = cart.items.find(
        (p) => p.productId.toString() === newItem.productId.toString()
      );

      if (existingItem) {
        console.log(" Product already in cart, increasing quantity");
        existingItem.quantity += 1;
      } else {
        console.log(" New product, pushing to cart");
        cart.items.push(newItem);
      }
    }

    await cart.save();
    return res.status(200).json({ message: 'Product added to cart' });
  } catch (err) {
    console.error("Add-to-cart error:", err);
    return res.status(500).json({ error: 'Failed to add to cart' });
  }
};


const getCart = async (req, res) => {
  const { mobile } = req.params;

  try {
    const cart = await Cart.findOne({ mobile });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);

  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

const deleteCartItem = async (req, res) => {
  const { mobile, productId } = req.params;
  console.log(" Delete request received for:", mobile, productId);

  try {
    const result = await Cart.findOneAndUpdate(
      { mobile },
      { $pull: { items: { productId: productId} } }, // Remove product from array
      { new: true } // return updated document
    );

    if (!result) {
      return res.status(404).json({ message: 'Cart not found or product not found' });
    }

    res.status(200).json({ message: 'Item deleted from cart', cart: result });
  } catch (error) {
    console.error('Error deleting item from cart:', error);
    res.status(500).json({ message: 'Server error while deleting item' });
  }
};

const updateCartQuantity = async (req, res) => {
  const { mobile } = req.params;
  const { productId, delta } = req.body;

  try {
    // Find cart of user
    const cart = await Cart.findOne({ mobile });
    console.log("Cart found:", cart);

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    if (!Array.isArray(cart.items)) {
      return res.status(500).json({ message: 'Cart items is not an array' });
    }

    // Find product inside cart's products array
    const item = cart.items.find((i) => i.productId === productId);

    if (!item) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Update quantity (minimum 1)
    item.quantity = Math.max(1, item.quantity + delta);
     item.totalDprice = item.dprice * item.quantity;
     item.totalAprice = item.aprice * item.quantity;
    // Save updated cart
    await cart.save();

    res.status(200).json({ message: 'Quantity updated', cart });
  } catch (error) {
    console.error('Error updating quantity:', error);
    res.status(500).json({ message: 'Server error while updating quantity' });
  }
};


module.exports = { AddtoCart, getCart,deleteCartItem,updateCartQuantity };

