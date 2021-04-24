const { Type, validate } = require("../models/type");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const types = await Type.find().sort("name");
  res.send(types);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let type = new Type({ name: req.body.name });
  type = await type.save();

  res.send(type);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const type = await Type.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!type)
    return res.status(404).send("Type with the given ID was not found.");

  res.send(type);
});

router.delete("/:id", async (req, res) => {
  const type = await Type.findByIdAndRemove(req.params.id);

  if (!type)
    return res.status(404).send("The piece with the given ID was not found.");

  res.send(type);
});

router.get("/:id", async (req, res) => {
  const type = await Type.findById(req.params.id);

  if (!type)
    return res.status(404).send("The piece with the given ID was not found.");

  res.send(type);
});

module.exports = router;
