require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("MongoDB Connected Successfully");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const User = require("./models/User");

app.get("/create", async (req, res) => {
    const user = await User.create({
        name: "John Doe",
        email: "john@example.com"
    });

    res.json(user);
});

app.get("/users", async (req, res) => {
    const users = await User.find();

    res.json(users);
});