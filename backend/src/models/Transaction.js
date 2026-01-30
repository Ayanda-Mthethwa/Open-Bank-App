import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    account: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
    type: String,
    amount: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
