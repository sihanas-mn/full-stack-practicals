import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

// Load environment variables
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is running");
});

//native driver routes
app.use("/api/users", userRoutes);

// Start the server

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer()