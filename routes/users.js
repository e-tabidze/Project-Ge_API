const { User, validate } = require("../models/user");
const { Jewel } = require("../models/jewel");
const auth = require("../middleware/auth");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select([
    "-password",
    "-repeat_password",
  ]);
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User is already registered");

  user = new User(
    _.pick(req.body, ["name", "email", "password", "repeat_password"])
  );

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.repeat_password = await bcrypt.hash(user.repeat_password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "name", "email"]));
});

router.post("/jewels", async (req, res) => {
  let jewels = await Jewel.find({ userId: req.body.userId });
  res.send(jewels)
});

module.exports = router;
