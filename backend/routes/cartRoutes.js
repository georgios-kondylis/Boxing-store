import express from 'express';
import { Cart } from '../Cart.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const cart = await Cart.find();
    res.status(200).json(cart); // Send the cart items with base64 images
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart items", error });
  }
});

router.post('/', async (req, res) => {
  try {
    const { brand, weight, price, img } = req.body;
    const newCartItem = new Cart({ brand, weight, price, img });
    await newCartItem.save();
    res.status(200).json({ message: 'Item added to cart', cartItem: newCartItem });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

export default router;
