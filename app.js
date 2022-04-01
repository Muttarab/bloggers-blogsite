const express = require("express");
const app = express();
const dotenv = require("dotenv")
dotenv.config();
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require('cors');
const PORT = process.env.PORT || 8000;
const path = require('path')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }));
app.use(bodyParser.json());
app.use(express.static('build')); 
app.use("/", routes);
app.use(express.static('./images'));
app.listen(PORT, () => { // start server and listen on specified port
  console.log(`App is running on ${PORT}`) // confirm server is running and log port to the console
}) 


