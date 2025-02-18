import express from 'express';
import { boxingGloveModel } from '../Boxing_gear.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const gloves = await boxingGloveModel.find();
    res.json(gloves);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gloves', error });
  }
});

export default router;
