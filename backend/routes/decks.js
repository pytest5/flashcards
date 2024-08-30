const express = require("express");
const router = express.Router();
const deckControllers = require("../controllers/DecksController")

// router.get("/", deckControllers.index);
// router.get("/:userId", deckControllers.show);
router.post("/", deckControllers.create);
// router.delete("/:userId", deckControllers.destroy);
// router.put("/:userId", deckControllers.update);

module.exports = router;