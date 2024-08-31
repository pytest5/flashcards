const Subject = require("../models/Subject");

// get all Subjects
async function getAll(req, res) {
  if (!req.body) res.status(400).json({ error: "Invalid request body" });
  try {
    const subjects = await Subject.find({});
    res.status(200).json(subjects);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unable to retrieve subjects" });
  }
}

// create subject ** DEV USE ONLY **
async function create(req, res) {
  if (!req.body) res.status(400).json({ error: "Invalid request body" });
  try {
    const subject = await Subject.create(req.body);
    res.status(201).json(subject);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unable to create subject" });
  }
}

// delete subject ** DEV USE ONLY **
async function destroy(req, res) {
  const { subjectId } = req.params;
  if (!subjectId) res.status(400).json({ error: "Invalid subject id" });
  try {
    await Subject.findByIdAndDelete(subjectId);
    res.status(204).end();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unable to delete subject" });
  }
}

// update subject ** DEV USE ONLY **
async function update(req, res) {
  const { subjectId } = req.params;
  if (!subjectId) res.status(400).json({ error: "Invalid subject id" });
  if (!req.body) res.status(400).json({ error: "Invalid request body" });
  try {
    const subject = await Subject.findByIdAndUpdate(subjectId, req.body, {
      new: true,
    });
    if (!subject)
      return res.status(404).json({ error: "Unable to find subject" });
    res.status(201).json(subject);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Unable to update card" });
  }
}

module.exports = {
  create,
  getAll,
  destroy,
  update,
};
