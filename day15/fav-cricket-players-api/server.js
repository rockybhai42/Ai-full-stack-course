import express from "express"
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddle.js";
import playerRoutes from "./routes/playerRoutes.js";
import cors from "cors";


dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT ;


connectDB();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/players",playerRoutes);


app.get("/profile", authMiddleware, (req, res) => {

    res.json({
        success: true,
        message: "Protected Route",
        user: req.user
    });

});

app.get("/", (req, res) => {
  res.send(" Favorite Cricket Players API is running!");
});









app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
}); 

