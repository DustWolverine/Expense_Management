import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      require: true,
    },
    amount: {
      type: Number,
      required: [true, "amount is requried"],
    },
    type: {
      type: String,
      required: [true, "type is required"],
    },
    category: {
      type: String,
      required: [true, "category is required"],
    },
    referense: {
      type: String,
      required: [true, "reference is required"],
    },
    description: {
      type: String,
      required: [true, "description true"],
    },
    date: {
      type: Date,
      required: [true, "date is requried"],
    },
    action: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("transaction", transactionSchema);
