import express from "express";
import {
  createPlayer,
  getPlayers,
  getPlayer,
  updatePlayer,
  deletePlayer
} from "../controllers/playerController.js";
import authMiddleware from "../middleware/authmiddle.js";

const router = express.Router();

router.post("/", authMiddleware, createPlayer);
router.get("/", authMiddleware, getPlayers);
router.get("/:id", authMiddleware, getPlayer);
router.put("/:id", authMiddleware, updatePlayer);
router.delete("/:id", authMiddleware, deletePlayer);

export default router;
