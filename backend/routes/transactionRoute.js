import express from "express";
import {
  addTransaction,
  // deleteTransaction,
  editTransaction,
  getAllTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

//?routes
//?add transaction
router.post("/addtransaction", addTransaction);
//?Edit transaction
router.post("/edittransaction", editTransaction);
//?Delete transaction
// router.post("/deletetransaction", deleteTransaction);
//?getAll transaction
router.post("/alltransaction", getAllTransaction);

export default router;
