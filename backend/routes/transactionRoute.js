import express from "express";
import {
  addTransaction,
  editTransaction,
  getAllTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

//?routes
//?add transaction
router.post("/addtransaction", addTransaction);
//?Edit transaction
router.post("/edittransaction", editTransaction);
// router.post("/edit", editTransaction);
//?getAll transaction
router.post("/alltransaction", getAllTransaction);

export default router;
