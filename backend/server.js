import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/connectDb.js";
import userRoute from "./routes/userRoute.js";
import transactionRoute from "./routes/transactionRoute.js";

const app = express();
const PORT = process.env.PORT || 8080;

dotenv.config();
connectDb();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
//? routes for user
app.use("/api/v1/user", userRoute);
//?routes for transaction
app.use("/api/v1/transaction", transactionRoute);

app.listen(PORT, () => {
  console.log(`The App is Running on ${PORT}`);
});
