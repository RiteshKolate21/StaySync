import express from "express";
import mongoose from "mongoose";
import ejs from "ejs";
import { Listing } from "./models/listing.js";


import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;


//database connection
const MONGO_URL = process.env.MONGO_URL;

main()
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}


//Routes
app.get("/", (req, res) => {
  res.send("Hello from StaySync");
});


// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "Beautiful Beach House",
//         description: "A lovely house near the sea with amazing sunset view.",
//         price: 12000,
//         location: "Goa",
//         country: "India"
//     });

//     await sampleListing.save();
//     console.log("sample was save");
//     res.send("Sample Listing Created");
// });

//server
app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
