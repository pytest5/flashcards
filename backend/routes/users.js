const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/UsersController")

router.get("/", UsersController.index);
router.get("/:userId", UsersController.show);
router.post("/", UsersController.create);
router.delete("/:userId", UsersController.destroy);
router.put("/:userId", UsersController.update);
router.post("/login", UsersController.login);

module.exports = router;