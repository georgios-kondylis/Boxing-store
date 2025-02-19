import express from 'express';
import { boxingGloveModel } from '../Boxing_gear.js';

const router = express.Router();

// Get all gloves
router.get('/', async (req, res) => {
  try {
    const gloves = await boxingGloveModel.find();
    res.json(gloves);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gloves', error });
  }
});

router.put('/', async (req, res) => {
  const { _id } = req.body; // The glove's ID
  try {
      const glove = await boxingGloveModel.findById(_id); // Find the glove first to get its current 'liked' status
    if (!glove) {
      return res.status(404).json({ message: 'Glove not found' });
    }
    // Toggle the 'liked' status
    const updatedGlove = await boxingGloveModel.findOneAndUpdate(
      { _id }, // Filter: Find glove by ID
      { liked: !glove.liked }, // Toggle liked status
      { new: true } // Return the updated document
    );
    res.json({ message: 'Glove liked status toggled', glove: updatedGlove });
  } catch (error) {
    res.status(500).json({ message: 'Error updating glove', error });
  }
});


export default router;
