import express from "express";
import mongoose from "mongoose";
import ejs from "ejs";
import { Listing } from "./models/listing.js";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));


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

//Listing Route
app.get("/listings",async(req,res)=>{
  const alllistings = await Listing.find({});
  res.render("listings/index.ejs", { alllistings }); 
  
});

//Show Route

app.get("/listings/:id",async(req,res)=>{

  const {id}=req.params;
  const listing=await Listing.findById(id);
  res.render("listings/show.ejs",{ listing })
});


//server
app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
