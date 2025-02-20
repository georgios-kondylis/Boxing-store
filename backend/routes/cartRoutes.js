import express from 'express';
import { Cart, favourites } from '../Cart.js';

const router = express.Router();

// GET all cart items
router.get('/', async (req, res) => {
  try {
    const cart = await Cart.find();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart items", error });
  }
});

// POST - Add item to cart
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

// DELETE - Remove item from cart by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Cart.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: 'Item deleted successfully', deletedItem });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

export default router;
