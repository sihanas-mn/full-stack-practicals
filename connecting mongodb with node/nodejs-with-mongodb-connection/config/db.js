import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGO_URI || "mongodb://localhost:27017";
const dbName = process.env.DB_NAME || "artifact_db";

// Connect to MongoDB
const client = new MongoClient(url);
export let db;

export const connectDB = async () => {
  try {
    await client.connect();
    db = client.db(dbName);
    console.log(`DB connected with database ${dbName}!!`);
  } catch (error) {
    console.error("connection failed!!", error.message);
  }
};
