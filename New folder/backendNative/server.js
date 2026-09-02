const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
let db = client.db("brandNewDB");
let collection = db.collection("newCollection");

async function connectDB() {
  try {
    await client.connect();
    console.log("db connected successfully!");
    db = client.db("brandNewDB");
    collection = db.collection("newCollection");
  } catch (error) {
    console.log("connection failed", error);
  }
}

connectDB();

let whatInserted = '';

async function insertRecord() {
  whatInserted = await collection.insertOne({
    name: "aski",
    age: 23,
    mail: "aski@gmail.com",
  });
}

insertRecord();
console.log(whatInserted)
