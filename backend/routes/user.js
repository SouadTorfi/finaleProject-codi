const express = require("express");
const router = express.Router();
var controller = require("../controllers/userController");

router.get("/", controller.AllUsers);
router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.get("/:id", controller.OneUser);
router.put("/:id", controller.UpdateUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;
