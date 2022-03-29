const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");
const fs = require("fs");
const connectDB = require("./server/database/connection");

dotenv.config({ path: "config.env" });
const port = process.env.PORT || 5000;

//Log Request
let accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});
app.use(morgan("tiny", { stream: accessLogStream }));

// mongoDB connection
connectDB();

//Parse Request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

//Set View Engine
app.set("view engine", "ejs");

//Load Assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));

// Load Routers
app.use("/", require("./server/routes/router"));

app.get("/come", (req, res) => {
  res.send("comehere");
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port} 🔥`);
});
