const express = require("express");
const router = express.Router();

// get all subjects
router.get("/");

// add subject (** DEV USE ONLY **)
router.post("/");

// delete subject (** DEV USE ONLY **)
router.delete("/:subjectId");

// update subject (** DEV USE ONLY **)
router.put("/:subjectId");

module.exports = router;
