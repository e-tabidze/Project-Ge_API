const { Piece, validate } = require("../models/piece");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const pieces = await Piece.find().sort("name");
  res.send(pieces);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let piece = new Piece({ name: req.body.name });
  piece = await piece.save();

  res.send(piece);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const piece = await Piece.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!piece)
    return res.status(404).send("The piece with the given ID was not found.");

  res.send(piece);
});

router.delete("/:id", auth, async (req, res) => {
  const piece = await Piece.findByIdAndRemove(req.params.id);

  if (!piece)
    return res.status(404).send("The piece with the given ID was not found.");

  res.send(piece);
});

router.get("/:id", async (req, res) => {
  const piece = await Piece.findById(req.params.id);

  if (!piece)
    return res.status(404).send("The piece with the given ID was not found.");

  res.send(piece);
});

module.exports = router;
