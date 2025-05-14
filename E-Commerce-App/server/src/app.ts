import express, { NextFunction, Request, Response } from "express";

import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
import { config } from "dotenv";
import morgan from "morgan";
import Stripe from "stripe";

// Importing Routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/products.js";
import orderRoute from "./routes/order.js";
import paymentRoute from "./routes/payment.js";
import dashboardRoute from "./routes/stats.js";
import cors from "cors";

config({
  path: "./.env",
});

const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || "";
const stipeKey = process.env.STRIPE_KEY || "";

// Connected to Db
connectDB(mongoURI);

export const stripe = new Stripe(stipeKey);
export const myCache = new NodeCache();

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
// app.use(
//   cors({
//     origin: ["http://localhost:5173"],methods: ['POST',""]
//   })
// );

// For Checking is Api run
app.get("/api/v1/test", (req, res) => {
  console.log("hello i am run");
  res.send("This is for testing");
});

// Using Routes

app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/dashboard", dashboardRoute);

app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Express is working on http://localhost:${PORT}`);
});
