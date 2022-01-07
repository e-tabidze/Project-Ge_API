const { User } = require("../models/user");
const Token = require("../models/token");
const auth = require("../middleware/auth");
const sendEmail = require("../utils/sendMail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const schema = Joi.object({ email: Joi.string().email().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send("user with given email doesn't exist");

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }

    const link = `${process.env.BASE_URL}/reset-password/${user._id}/${token.token}`;
    await sendEmail(user.email, "Password reset", link);

    res.send("Password reset link sent to your email account");
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
});

router.post("/change", auth, async (req, res) => {
  try {
    console.log(req.user, "[DECODED USER]");
    const schema = Joi.object({ password: Joi.string().required() });
    const { error } = schema.validate(req.body.password);
    console.log("We happy? 1")

    if (error) return res.status(400).send(error.details[0].message);
    const user = await User.findById(req.user._id);
    console.log("We happy? 2", user)

    if (!user) return res.status(400).send("User not Found");

    const validPassword = await bcrypt.compare(req.body.currentPassword, user.password);
    console.log("We happy? 3", validPassword, req.body.currentPassword, user.password);
    if (!validPassword) return res.status(400).send("Password is Incorrect");

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.newPassword, salt);
    console.log("We happy? 4")
    await user.save().catch((e) => console.log(e, "He Dead"));
    res.status(200).send("Password Changed Successfully")
  } catch (error) {
    console.log(error);
    res.status(400).send("An error occured");
  }
});

module.exports = router;
