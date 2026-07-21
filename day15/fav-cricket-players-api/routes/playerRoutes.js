import express from "express";

import {

createPlayer,

getPlayers,

getPlayer,

updatePlayer,

deletePlayer

} from "../controllers/playerController.js";

import authMiddle from "../middleware/authmiddle.js";

const router = express.Router();

router.post("/", authMiddle, createPlayer);

router.get("/", authMiddle, getPlayers);

router.get("/:id", authMiddle, getPlayer);

router.put("/:id", authMiddle, updatePlayer);

router.delete("/:id", authMiddle, deletePlayer);

export default router;