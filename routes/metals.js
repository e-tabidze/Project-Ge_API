const { Metal, validate } = require("../models/metal");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const metals = await Metal.find().sort("name");
  res.send(metals);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let metal = new Metal({ name: req.body.name });
  metal = await metal.save();

  res.send(metal);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const metal = await Metal.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!metal)
    return res.status(404).send("The metal with the given ID was not found.");

  res.send(metal);
});

router.delete("/:id", auth, async (req, res) => {
  const metal = await Metal.findByIdAndRemove(req.params.id);

  if (!metal)
    return res.status(404).send("The metal with the given ID was not found.");

  res.send(metal);
});

router.get("/:id", async (req, res) => {
  const metal = await Metal.findById(req.params.id);

  if (!metal)
    return res.status(404).send("The metal with the given ID was not found.");

  res.send(metal);
});

module.exports = router;
