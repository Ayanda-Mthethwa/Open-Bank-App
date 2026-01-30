import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["SAVINGS", "CURRENT", "FIXED"],
      default: "SAVINGS",
    },
    balance: {
      type: Number,
      default: 0,
    },
    accountNumber: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Account", accountSchema);
