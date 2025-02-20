import express from 'express';
import { boxingGearModel } from '../Boxing_gear';

const router = express.Router();

// router.get('/', async (req, res) => {
//   const gear = await boxingGearModel.find();
//   res.json(gear);
// })

// router.put('/', async (req, res) => {
//   const { _id } = req.body; // The glove's ID
//   const gear = await boxingGearModel.findById(_id); 

//   const updatedGear = await boxingGearModel.findOneAndUpdate(
//     { _id }, 
//     { liked: !gear.liked }, 
//     { new: true } 
//   )
// });

router.get('/', async (req, res) => {
  try {
    const gear = await boxingGearModel.find();
    res.json(gear);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gear', error });
  }
});


router.put('/', async (req, res) => {
  const { _id } = req.body; // The glove's ID
  try {
      const gear = await boxingGearModel.findById(_id); // Find the glove first to get its current 'liked' status
    if (!gear) {
      return res.status(404).json({ message: 'Gear not found' });
    }
    // Toggle the 'liked' status
    const updatedGear = await boxingGearModel.findOneAndUpdate(
      { _id }, // Filter: Find glove by ID
      { liked: !gear.liked }, // Toggle liked status
      { new: true } // Return the updated document
    );
    res.json({ message: 'gear liked status toggled', gear: updatedGear });
  } catch (error) {
    res.status(500).json({ message: 'Error updating gear', error });
  }
});