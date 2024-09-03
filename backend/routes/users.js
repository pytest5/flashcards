const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/UsersController");
const { verifyToken } = require("../middleware/verify-token.js");

router.post("/", UsersController.create);
router.post("/login", UsersController.login);
router.get("/currentUser", verifyToken, UsersController.getCurrentUser);
router.get("/", verifyToken, UsersController.index);
router.get("/:userId", verifyToken, UsersController.show);
router.delete("/:userId", verifyToken, UsersController.destroy);
router.put("/:userId", verifyToken, UsersController.update);

module.exports = router;
