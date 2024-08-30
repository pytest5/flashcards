const express = require("express");
const router = express.Router();

// /api/cards

// get all cards
router.get("/");

// get card
router.get("/:id");

// create card
router.post("/");

// delete card
router.delete("/:cardId");

// update card
router.put("/:cardId");
