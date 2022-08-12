const express = require("express");
const router = express.Router();
var controller = require("../controllers/medicineController");
(multer = require("multer")), (mongoose = require("mongoose"));
const { v4: uuidv4 } = require("uuid");
const DIR = "./public/images";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.get("/", controller.AllMedicines);
router.get("/lastMedicines", controller.lastMedecines);
router.post("/", upload.array("image", 6), controller.post);
router.get("/:id", controller.OneMedicine);
router.put("/:id", upload.array("image", 6), controller.UpdateMedicine);
router.delete("/:id", controller.deleteMedicine);

module.exports = router;
