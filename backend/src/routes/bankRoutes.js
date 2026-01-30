import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getAccounts, getBalance, deposit, withdraw, history } from "../controllers/bankController.js";


const router = express.Router();

router.get("/accounts", protect, getAccounts);
router.post("/deposit", protect, deposit);
router.post("/withdraw", protect, withdraw);
router.get("/history", protect, history);
router.get("/balance", protect, getBalance);

export default router;
