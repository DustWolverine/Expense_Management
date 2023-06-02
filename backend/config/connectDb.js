import mongoose from "mongoose";
import colors from "colors";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, options);
    console.log(
      `Connected to Database ${mongoose.connection.host}`.bgCyan.white
    );
  } catch (error) {
    console.log(`${error}`.bgRed);
  }
};

export default connectDb;
