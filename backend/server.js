import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
// import colors from "colors";
import cors from "cors";
import connectDb from "./config/connectDb.js";

const PORT = 8080 || process.env.PORT;
dotenv.config();
connectDb();
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("<h1>Hello From the server</h1>");
});

app.listen(PORT, () => {
  console.log(`The App is Running on ${PORT}`.bgBlack);
});
