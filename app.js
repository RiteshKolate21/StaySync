import express from "express";
import mongoose from "mongoose";
import ejs from "ejs";

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



//server
app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
