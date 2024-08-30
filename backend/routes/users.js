const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/UsersController")

router.get("/", userControllers.index);
router.get("/:userId", userControllers.show);
router.post("/", userControllers.create);
router.delete("/:userId", userControllers.destroy);
router.put("/:userId", userControllers.update);

module.exports = router;