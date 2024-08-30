const express = require("express");
const router = express.Router();
const DecksController = require("../controllers/DecksController")

router.get("/", DecksController.index);
router.get("/:deckId", DecksController.show);
router.post("/", DecksController.create);
router.delete("/:deckId", DecksController.destroy);
router.put("/:deckId", DecksController.update);

module.exports = router;