const { User, validate } = require("../models/user");
const { Jewel } = require("../models/jewel");
const auth = require("../middleware/auth");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID =
  "704488732562-ofds382h4i03r4dppesnbkj3tqfv5gjc.apps.googleusercontent.com";
const CLIENT_SECRET = "PN_1wqroZjrhS_yS1ewjCS_c";
const REDIRECT_URI =
  "1//043anaDGwkm7wCgYIARAAGAQSNwF-L9Ir-VMqLE5sSfk0jkM_-7h2aKHL6kd2V3-zeLkp6_nKEtcPXn-foaRK3r7oI3a7DAoPkHI";
const REFRESH_TOKEN =
  "ya29.a0ARrdaM_iJb-BBA6i3ZISx3B8FzC60UcXYMMXPMzcTbjwekvEXEyEnzixzr9A7oQyTS4SD8EUgCwybrTPrcXv609AWMxxK8inWVnc39TZBErLgH7Bfx5M4RK4S2QbbXsE6StcnJM_z7gSAGDC_uS-xRgTOKu1";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({});
  } catch (error) {
    return error;
  }
}

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
    _.pick(req.body, [
      "name",
      "email",
      "password",
      "repeat_password",
      "favorite_products",
    ])
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

// editUsername
router.patch("/editusername/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findById(req.params.id);
  if (!user) return res.status(400).send("invalid link or expired");

  user.name = req.body.name;
  user.email = req.body.email;

  await user.save();

  const token = user.generateAuthToken();

  if (!user) {
    return res.status(404).send("ERROR");
  }

  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(user);
});

// check user password when updating password
router.post("/checkpassword", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const decoded = jwt.verify(
    req.header("token"),
    process.env.ACCESS_TOKEN_SECRET
  );
  const user = await User.findOne({ email: decoded.email });
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (validPassword) return res.status(200).send("Valid email or password");
});

router.post("/jewels", async (req, res) => {
  let jewels = await Jewel.find({ userId: req.body.userId });
  res.send(jewels);
});

// adding fav product
router.get("/add/:userID/:productID", auth, async (req, res) => {
  await User.findById(req.params.userID)
    .then(async (response) => {
      response.favorite_products.push(req.params.productID);
      await response.save();
      res.status(200).send({ message: "OK", response });
    })
    .catch((err) => {
      res.status(400).send({ message: "Tupoi" });
    });
});

// removing fav product
router.get("/remove/:userID/:productID", auth, async (req, res) => {
  await User.findById(req.params.userID)
    .then(async (response) => {
      response.favorite_products?.remove(req.params.productID);
      await response.save();
      res.status(200).send({ message: "OK", response });
    })
    .catch((err) => {
      res.status(400).send({ message: "Tupoi" });
    });
});

// get user favorite produts
router.get("/:userID", async (req, res) => {
  const userJewels = await User.findById(req.params.userID).select(
    "favorite_products"
  );
  res.send(userJewels);
});

module.exports = router;
