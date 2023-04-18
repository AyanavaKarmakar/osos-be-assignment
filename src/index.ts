import "dotenv/config";
import express from "express";
import { json } from "body-parser";
import { PopulateDBRouter, RestaurantRouter, SearchRouter } from "./routes";
import { connectDB } from "./db/connect";

const app = express();
app.use(json());

// Routes
app.use("/restaurants", RestaurantRouter);
app.use("/search", SearchRouter);
app.use("/populatedb", PopulateDBRouter);

const start = async () => {
  try {
    console.log("Connecting to DB...");
    await connectDB(process.env.MONGODB_URI as string);
    console.log("Connected to DB!");

    app.listen(process.env.PORT || 3000, () => {
      console.log(`server is listening on port ${process.env.PORT || 3000}!`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
