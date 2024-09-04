const express = require("express");
const router = express.Router();
const SubjectsController = require("../controllers/SubjectsController.js");
const { verifyToken } = require("../middleware/verify-token.js");

// get all subjects
router.get("/", SubjectsController.getAll);

// add subject (** DEV USE ONLY **)
router.post("/", SubjectsController.create);

// delete subject (** DEV USE ONLY **)
router.delete("/:subjectId", SubjectsController.destroy);

// update subject (** DEV USE ONLY **)
router.put("/:subjectId", SubjectsController.update);

// get subject
router.get("/:subjectId", SubjectsController.show);

module.exports = router;
