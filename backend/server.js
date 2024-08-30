const mongoose = require("mongoose");
require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const morgan = require("morgan");

const usersRouter = require("./routes/users");
const decksRouter = require("./routes/decks.js")
const cardsRouter = require("./routes/cards.js");

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(express.static("../frontend/dist")); // check again

app.use("/api/users", usersRouter);
app.use("/api/decks", decksRouter);
app.use("/api/cards", cardsRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
}
