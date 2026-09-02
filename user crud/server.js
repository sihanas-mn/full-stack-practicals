import express from 'express';
import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors'

dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());

// Load environment variables
const PORT = process.env.PORT || 5000;
const url = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'students_db';

// Connect to MongoDB
const client = new MongoClient(url);
const db = await client.connect().then(() => client.db(dbName));

// Basic route to check if the server is running
app.get('/', (req, res) => {
  res.send('Server is running');
});


// Create a new student
app.post('/api/users', async (req, res) => {
  const result = await db.collection('user').insertOne(req.body);
  res.json({ message: 'Created Successfully', id: result.insertedId,result });
});


// Get all students
app.get('/api/users', async (req, res) => {
  const datas = await db.collection('user').find().toArray();
  res.json(datas);
});

// Get a single student by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await db.collection('user').findOne({ _id: new ObjectId(req.params.id) });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: 'Invalid id or request', details: err.message });
  }
});


// Update a student by ID
app.put('/api/users/:id', async (req, res) => {
  const result = await db.collection('user').updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );
  res.json({ message: 'Updated', result });
});


// Delete a student by ID
app.delete('/api/users/:id', async (req, res) => {
  const result = await db.collection('user').deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ message: 'Deleted', result });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});