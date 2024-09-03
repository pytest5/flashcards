const express = require("express");
const router = express.Router();

const CardsController = require("../controllers/CardsController");

// get all cards by current user id
router.get("/", CardsController.index);

// get by card id
router.get("/:cardId", CardsController.getByCardId);

// get all cards
router.get("/:cardId", CardsController.getAll);

// create card
router.post("/", CardsController.create);

// delete card
router.delete("/:cardId", CardsController.destroy);

// update card
router.put("/:cardId", CardsController.update);

module.exports = router;
