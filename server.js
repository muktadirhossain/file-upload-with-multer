const { urlencoded } = require("express");
const express = require("express");
const dotenv = require("dotenv").config();
const multer = require("multer");
const path = require("path");
const storage = require("./utils/multerStorage.js");

const app = express();
// parse Request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// static Folder:
app.use(express.static(path.join(__dirname, "static")));

// multer middleware function:
const fromDataHandler = multer({
  storage,
}).fields([
  {
    name: "photo",
    maxCount: 1,
  },
  {
    name: "gallary",
    maxCount: 5,
  },
  {
    name: "cv",
    maxCount: 1,
  },
]);

app.post("/", fromDataHandler, (req, res) => {
  console.log(req.files);
  const { name, email, cell } = req.body;
  const { cv, gallary,photo } = req.files;
  //   get all Gallery Images link:
  const galLinks = gallary.map((item) => {
    let link = item.destination.concat("/", cv[0].filename);
    return link;
  });

  res.status(201).json({
    name,
    email,
    cell,
    profilePhoto: photo[0].destination.concat("/", photo[0].filename),
    cv: cv[0].destination.concat("/", cv[0].filename),
    gallery: galLinks,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
  console.log(`server started on: http://localhost:${PORT}`);
});
