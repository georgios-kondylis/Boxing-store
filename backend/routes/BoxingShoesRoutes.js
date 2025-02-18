import express from 'express';
import { boxingShoeModel } from '../Boxing_gear.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const shoes = await boxingShoeModel.find();
    res.status(200).json(shoes); // Send the list of boxers as a JSON response
  } catch (error) {
    res.status(500).json({ message: "Error fetching shoes", error });
  }
});

export default router;