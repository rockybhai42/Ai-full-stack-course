import mongoose from "mongoose";

const playerSchema = new mongoose.Schema(
  {
    playerName: {
      type: String,
      required: [true, "Player name is required"],
      trim: true,
    },

    runs: {
      type: Number,
      required: [true, "Runs are required"],
      min: 0,
    },

    strikeRate: {
      type: Number,
      required: [true, "Strike rate is required"],
      min: 0,
    },

    internationalStatus: {
      type: String,
      required: true,
      enum: ["Active", "Retired"],
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Player = mongoose.model("Player", playerSchema);

export default Player;