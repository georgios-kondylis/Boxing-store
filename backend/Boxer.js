import mongoose, { Schema } from 'mongoose';

// Connect to MongoDB
const MONGO_URI_Boxers = process.env.MONGO_URI_Boxers;
const boxersConnection = mongoose.createConnection(MONGO_URI_Boxers)

// Schema is like a blueprint
const boxerSchema = new mongoose.Schema({ 
  name: String,
  age: Number
});

// Export the model
export const boxerModel = boxersConnection.model('boxerModel', boxerSchema); // (modelName, Schema, customCollectionName(otional))
