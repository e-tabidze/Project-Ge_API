const { Stone, validate } = require("../models/stone");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const stones = await Stone.find().sort("name");
  res.send(stones);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let stone = new Stone({ name: req.body.name });
  stone = await stone.save();

  res.send(stone);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const stone = await Stone.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!stone)
    return res.status(404).send("The Stone with the given ID was not found.");

  res.send(stone);
});

router.delete("/:id", auth, async (req, res) => {
  const stone = await Stone.findByIdAndRemove(req.params.id);

  if (!stone)
    return res.status(404).send("The stone with the given ID was not found.");

  res.send(stone);
});

router.get("/:id", async (req, res) => {
  const stone = await Stone.findById(req.params.id);

  if (!stone)
    return res.status(404).send("The stone with the given ID was not found.");

  res.send(stone);
});

module.exports = router;
