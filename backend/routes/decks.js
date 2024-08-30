const express = require("express");
const router = express.Router();
const DecksController = require("../controllers/DecksController")

// router.get("/", DecksControlles.index);
// router.get("/:userId", DecksController.show);
router.post("/", DecksController.create);
// router.delete("/:userId", DecksController.destroy);
// router.put("/:userId", DecksController.update);

module.exports = router;