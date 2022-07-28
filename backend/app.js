var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
require("dotenv").config();

// import routes

var categoryRouter = require("./routes/category");
var adminRouter = require("./routes/admin");
var userRouter = require("./routes/user");
var medicineRouter = require("./routes/medicine");

const { default: mongoose } = require("mongoose");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Database Connection
mongoose
  .connect(process.env.URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected Successfully to Database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/category", categoryRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/medicine", medicineRouter);

module.exports = app;
