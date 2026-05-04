import express from "express";
import mongoose from "mongoose";
import ejs from "ejs";
import { Listing } from "./models/listing.js";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from 'method-override';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(methodOverride('_method'));

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


//New Route
app.get("/listings/new",(req,res)=>{
res.render("listings/new.ejs")
});

//create Route
app.post("/listings",async (req,res)=>{
  const newlisting=new Listing(req.body.listing);
  await newlisting.save();
  res.redirect("/listings");
});

//edit route
app.get('/listings/:id/edit',async(req,res)=>{
  const {id}=req.params;
  const listing=await Listing.findById(id);
  res.render("listings/edit.ejs",{listing})
  console.log(listing);

})

//update route
app.put("/listings/:id",async(req,res)=>{
const {id}=req.params;
await Listing.findByIdAndUpdate(id,{...req.body.listing});
res.redirect(`/listings/${id}`);
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
