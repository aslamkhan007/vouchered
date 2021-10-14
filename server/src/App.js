const express = require("express");
var multer = require("multer");
const app = express();
require("./components/db/conn");
const User = require("./components/modals/userSchema");
const port = process.env.PORT || 8000;
const path = require("path");
const shortid = require("shortid");
app.use(express.json());
const bodyParser = require("body-parser");
const { error } = require("console");

//const upload = multer();

//console.log(path.join(__dirname,"./"))

app.use(bodyParser.json({ type: "application/json" }));
app.use(express.static(path.join(__dirname, "./upload")));

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg") {
      cb(null, true);
    } else {
      console.log("only jpg");
      cb(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

var upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    console.log(file.originalname);
    // cb(new error("file format is inccorrect"));
    // cb(undefined,true)
  },
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, file.originalname + ext);
  },
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/register", upload.single("profile"), (req, res) => {
  res.send(req.body);
  var myData = new User(req.body);

  myData.save();

  // res.send(req.file)
  //res.send(req.body)
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log("connection is sucessfuly");
});
