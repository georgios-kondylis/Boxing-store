import 'dotenv/config';
import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';

//------------ Connect to MongoDB -------------
const mongodb_uri = process.env.MONGO_URI;
const client = new MongoClient(mongodb_uri);
let db;  // create a global variable to Store the database instance

const connectToMongoDB = async () => {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");
    db = client.db('Boxing-Hall-of-Fame'); // Database Name
  } catch (err) {
    console.error('❌ malakia', err);
    process.exit(1);
  }
};
//------------ Connect to MongoDB -------------

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());

//------------ Create an Endpoint to GET the boxers -------------
app.get('/api/boxers', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: "Database not connected" });
    }
    const boxers = await db.collection('boxers').find().toArray();
    res.json(boxers);
  } catch (err) {
    console.error('Error fetching boxers:', err);
    res.status(500).json({ error: 'Could not fetch boxers' });
  }
});

//------------ Start the Server -------------
const startServer = async () => {
  await connectToMongoDB(); // Connect ONCE
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};
startServer();


