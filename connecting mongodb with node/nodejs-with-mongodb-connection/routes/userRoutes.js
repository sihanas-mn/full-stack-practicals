import express from "express";
import { ObjectId } from "mongodb";
import { db } from "../config/db.js";

const router = express.Router();

// Create a new user
router.post("/", async (req, res) => {
  const result = await db.collection("users").insertOne(req.body);
  res.json({ message: "Created Successfully", id: result.insertedId, result });
});

// Get all users (list)
router.get("/list", async (req, res) => {
  const datas = await db.collection("users").find().toArray();
  res.json(datas);
});

// Get a single user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(req.params.id) });
    if (!user) return res.status(404).json({ message: "user not found" });
    res.json(user);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Invalid id or request", details: err.message });
  }
});

// Update a user by ID
router.put("/:id", async (req, res) => {
  const result = await db
    .collection("users")
    .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
  res.json({ message: "Updated", result });
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
  const result = await db
    .collection("users")
    .deleteOne({ _id: new ObjectId(req.params.id) });
  res.json({ message: "Deleted", result });
});

// Basic route to check if the server is running
router.get("/", (req, res) => {
  res.send("Server is running");
});

export default router;