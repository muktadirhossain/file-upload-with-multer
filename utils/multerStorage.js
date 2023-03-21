const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    if (file.fieldname == "cv") {
      cb(null, req.body.name.replaceAll(' ', '_')+"_cv"+".pdf");
    } else {
      cb(null, Date.now() + "_" + file.originalname.replaceAll(' ', '_'));
    }
  },
  destination: (req, file, cb) => {
    // console.log(file);
    if (file.fieldname == "photo") {
      cb(null, "public/uploads/profilePhotos");
    }
    if (file.fieldname == "gallary") {
      cb(null, "public/uploads/gallaryPhotos");
    }
    if (file.fieldname == "cv") {
      cb(null, "public/uploads/docs");
    }
  },
});

module.exports = storage;
