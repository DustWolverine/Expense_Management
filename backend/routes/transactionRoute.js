import express from "express";
import {
  addTransaction,
  getAllTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

//?routes
//?add transaction
router.post("/addtransaction", addTransaction);
//?getAll transaction
router.post("/alltarnsaction", getAllTransaction);

export default router;
