const express = require("express");
const router = express.Router();
var controller = require("../controllers/adminController");

router.get("/", controller.AllAdmins);
router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.get("/:id", controller.OneAdmin);
router.put("/:id", controller.UpdateAdmin);
router.delete("/:id", controller.deleteAdmin);

module.exports = router;
