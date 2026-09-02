import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function main() {
  try {
    await client.connect();

    console.log("db connnected success!!");

    const db = client.db("allNewDb");

    const secondCollection = db.collection("newSecCollection");
    
    createUser(secondCollection);
    

  } catch (error) {
    console.log("connection error!!", error);
  }
}

main();

//create func
async function createUser(collection) {
  const user = {
    name: "abdullah",
    age: 20,
    mail: "exmaplr@gmail.com",
  };

  const result = await collection.insertOne(user);

  console.log(result);
}

//read func
async function getUsers(collection) {
    const users = await collection.find().toArray()
    console.log(users)
}

//update func
//delete func
