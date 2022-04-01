const express = require("express");
const app = express();
const dotenv = require("dotenv")
dotenv.config();
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require('cors');
const PORT=process.env.PORT || 8000
const path=require('path')
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }));
app.use(bodyParser.json());
app.use("/", routes);
app.use(express.static('./images'));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
const server = app.listen(PORT, "localhost", function () {
  console.log(`Blog App listening at http://localhost:${PORT}`);
});
