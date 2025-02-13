# HOW TO CONNECT TO A MONGODB DATABASE AND ACCESS THE FILES USING APIs

## STEP 1: Set Up the Backend
- **Create a `backend` folder** outside of the `src` map.  
- Run `npm init -y` inside `backend` to create a `package.json` file.  
- If you also want nodemon for auto-reloading, install it as a dev dependency:
npm install --save-dev nodemon
- Install necessary dependencies:  
  ```sh
  npm install express dotenv mongodb cors
  ```
  express → for creating the server.
  mongodb → to connect to MongoDB.
  dotenv → to keep your credentials safe.  
  cors → to allow requests from your React frontend.

## STEP 2: Set Up MongoDB Connection
- Inside `backend`, create a new file: **`server.js`**.  
- Import necessary modules:  
  ```js
  import 'dotenv/config';
  import express from 'express';
  import { MongoClient } from 'mongodb';
  import cors from 'cors';
  ```
- Create the **MongoDB connection function**:  
  ```js
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);

  async function connectToMongoDB() {
      try {
          await client.connect();
          console.log("✅ Connected to MongoDB!");
          return client.db("Boxing-Hall-of-Fame");  // Database name
      } catch (err) {
          console.error("❌ MongoDB connection error:", err);
          process.exit(1);
      }
  }
  ```

## STEP 3: Set Up Express Server
- Create an Express app and enable CORS:  
  ```js
  const app = express();
  app.use(cors());
  app.use(express.json());
  const port = process.env.PORT || 5000;
  ```

## STEP 4: Create API Endpoint to Fetch Data
- Inside `server.js`, add an endpoint to get boxers from MongoDB:  
  ```js
  app.get('/api/boxers', async (req, res) => {
      try {
          const db = await connectToMongoDB();
          const boxers = await db.collection('boxers').find().toArray();
          res.json(boxers);
      } catch (err) {
          res.status(500).json({ error: "Failed to fetch boxers" });
      }
  });
  ```

## STEP 5: Start the Server
- Create a function to start the server:  
  ```js
  async function startServer() {
      await connectToMongoDB();
      app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
  }
  startServer();
  ```
- **Run the backend**:  
  ```sh
  node backend/server.js
  ```

## STEP 6: Configure Environment Variables
- Create a **`.env`** file in `backend`:  
  ```env
  MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/Boxing-Hall-of-Fame
  PORT=5000
  ```

---

# HOW TO CONNECT REACT FRONTEND TO BACKEND

## STEP 7: Set Up Vite Proxy for API Calls
- Open `vite.config.js` in your **React project** and update it like this:  
  ```js
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';

  export default defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  });
  ```
- **This allows us to fetch `/api/boxers` without specifying `localhost:5000`.**  

## STEP 8: Create a Boxers Component in React
- In `src/components/Boxers.jsx`:  
  ```js
  import React, { useState, useEffect } from 'react';

  const Boxers = ({ textColor }) => {
    const [boxers, setBoxers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchBoxers = async () => {
        try {
          const response = await fetch('/api/boxers'); // Using proxy
          if (!response.ok) throw new Error('Network error');
          const data = await response.json();
          setBoxers(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchBoxers();
    }, []);

    if (loading) return <div className={textColor}>Loading...</div>;
    if (error) return <div className={textColor}>Error: {error}</div>;

    return (
      <div className={textColor}>
        <h2>Boxers Hall of Fame</h2>
        {boxers.map((boxer) => (
          <div key={boxer._id}>
            <h3>{boxer.name}</h3>
            <p>Nickname: {boxer.nickname}</p>
          </div>
        ))}
      </div>
    );
  };

  export default Boxers;
  ```

## STEP 9: Run the React App
- Start the React frontend:  
  ```sh
  npm run dev
  ```
- The React app will now **fetch the data from MongoDB through the Express API**.

---

## ✅ FINAL CHECKLIST
✔ **MongoDB connection set up in `server.js`**  
✔ **Express server running on `localhost:5000`**  
✔ **API routes correctly fetching data from MongoDB**  
✔ **Vite proxy correctly forwarding API requests**  
✔ **React frontend successfully fetching and displaying data**  

🔥 **Now, your React app can communicate with your MongoDB database through APIs!** 🚀

