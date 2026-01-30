// server.js
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

// Import your routes
import authRoutes from "./routes/authRoutes.js";
import bankRoutes from "./routes/bankRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.get("/", (req, res) => {
    res.send("Open API is Running...");
});

// Mount auth routes at /api/auth and bank routes at /api/bank
app.use("/api/auth", authRoutes); 
app.use("/api/bank", bankRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});