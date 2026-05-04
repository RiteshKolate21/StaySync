import mongoose from "mongoose";
import dotenv from "dotenv";
import { listingsData } from "./data.js";
import { Listing } from "../models/listing.js";

dotenv.config({ path: "../.env" });

const MONGO_URL = process.env.MONGO_URL;

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("connected to database");
}

const initDB = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(listingsData.data);
  console.log("data was initialized");
};

main()
  .then(() => initDB())
  .catch((err) => console.log(err));