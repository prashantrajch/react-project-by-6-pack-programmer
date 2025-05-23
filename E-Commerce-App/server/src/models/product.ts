import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter Name"],
    },
    photo: {
      type: String,
      required: [true, "Please enter Photo"],
    },
    price: {
      type: Number,
      required: [true, "Please enter  Price"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter  stock"],
    },
    category: {
      type: String,
      required: [true, "Please enter product Category"],
      trim: true
    },

  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", schema);
