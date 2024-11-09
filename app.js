//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
require('dotenv').config()
app.use(express.static("public"));

const mongoose = require('mongoose');
async function connectDB() {
  await mongoose.connect('mongodb://127.0.0.1:27017/RealEstate',{ useNewUrlParser: true })
  console.log("DB Connected!");
  
}



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/' }));
app.set('view engine', 'hbs');


app.get("/", async (req, res) => {
  try {
    const properties = await property.find().lean(); 
    res.render("owner/home", { properties });
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).send("Error fetching properties");
  }
});



let customer = require('./routes/customer');
const property = require("./models/property");

app.use('/customer', customer);

connectDB();
app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
