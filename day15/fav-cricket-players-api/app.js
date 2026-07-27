import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authmiddle.js";
import playerRoutes from "./routes/playerRoutes.js";

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.VALID_ORIGINS }));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/players", playerRoutes);

app.get("/profile", authMiddleware, (req, res) => {
  res.json({ success: true, message: "Protected Route", user: req.user });
});

app.get("/", (req, res) => {
  res.send("Favorite Cricket Players API is running!");
});

app.use((err, req, res, next) => {
  console.error(err); // full detail stays in your server logs, never in the response

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: Object.values(err.errors).map((e) => e.message).join(", "),
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Invalid ${err.path}: ${err.value}`,
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "Duplicate value for a unique field",
    });
  }

  res.status(500).json({
    success: false,
    message: "Something went wrong. Please try again later.",
  });
});

export default app;
