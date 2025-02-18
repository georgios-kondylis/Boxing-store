import express from 'express';
import { boxerModel } from '../Boxer.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const boxers = await boxerModel.find();
    res.status(200).json(boxers); // Send the list of boxers as a JSON response
  } catch (error) {
    res.status(500).json({ message: "Error fetching boxers", error });
  }
});

export default router;
