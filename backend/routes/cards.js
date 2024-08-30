const express = require("express");
const router = express.Router();

const CardsController = require("../controllers/CardsController");

// /api/cards

// get all cards
router.get("/", (req, res) => {
  res.send("all cards");
});

// get card
router.get("/:id");

// create card
router.post("/", CardsController.createCard);

// delete card
router.delete("/:cardId");

// update card
router.put("/:cardId");

module.exports = router;
