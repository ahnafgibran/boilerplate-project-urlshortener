require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
var apiRouter = require("./routes/api");

// Basic Configuration
const port = process.env.PORT || 3000

app.use(cors())

// Body parsing middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// DB connection
var MONGODB_URL = process.env.MONGO_URI
var mongoose = require("mongoose")
mongoose
  .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    //don't show the log when it is test
    if (process.env.NODE_ENV !== "test") {
      // console.log("Connected to %s", MONGODB_URL)
      console.log("App is running ... \n")
      console.log("Press CTRL + C to stop the process. \n")
    }
  })
  .catch((err) => {
    console.error("App starting error:", err.message)
    process.exit(1)
  })
var db = mongoose.connection



app.use("/public", express.static(`${process.cwd()}/public`))

app.use("/api/", apiRouter);

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html")
})

app.get("/test", function (req, res) {
  Counter.findOneAndUpdate({}, { $inc: { seq: 1 } }, { new: true })
    .exec()
    .then(function (counter) {
      res.json({ count: counter.seq })
    })
    .catch(function (err) {
      res.json({ error: err })
    })
})

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" })
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`)
})
