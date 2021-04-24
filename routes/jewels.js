const { Jewel, validate } = require("../models/jewel");
const { Metal } = require("../models/metal");
const { Piece } = require("../models/piece");
const { Stone } = require("../models/stone");
const { Type } = require("../models/type");
const auth = require("../middleware/auth");
const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.replace(/\s+/g, "-").toLowerCase();
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

router.get("/", async (req, res) => {
  const jewels = await Jewel.find().sort("name");
  res.send(jewels);
});

router.get("/super", async (req, res) => {
  let jewelArray = await Jewel.find();
  let jewelsSuper = jewelArray.filter((item) => {
    return item.type.name === "Super";
  });
  res.send(jewelsSuper);
});

router.get("/vip", async (req, res) => {
  let jewelArray = await Jewel.find();
  let jewelsVip = jewelArray.filter((item) => {
    return item.type.name === "VIP";
  });
  res.send(jewelsVip);
});

router.get("/default", async (req, res) => {
  let jewelArray = await Jewel.find();
  let jewelsDefailt = jewelArray.filter((item) => {
    return item.type.name === "Default";
  });
  res.send(jewelsDefailt);
});

router.post("/add", auth, upload.array("productImage"), async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const metal = await Metal.findById(req.body.metalId);
  if (!metal) return res.status(400).send("Invalid Metal");

  const piece = await Piece.findById(req.body.pieceId);
  if (!piece) return res.status(400).send("Invalid Piece");

  const stone = await Stone.findById(req.body.stoneId);
  if (!stone) return res.status(400).send("Invalid Stone");

  const type = await Type.findById(req.body.typeId);
  if (!type) return res.status(400).send("Invalid Type");

  let imageArray = req.files.map((file) => {
    return file.path;
  });
  let userObject = jwt.decode(req.headers["x-auth-token"]);
  let jewel = new Jewel({
    name: req.body.name,
    duration: req.body.duration,
    price: req.body.price,
    description: req.body.description,
    userId: userObject._id,
    standard: req.body.standard,
    productImage: imageArray,
    contactNumber: req.body.contactNumber,
    contactPerson: req.body.contactPerson,
    weight: req.body.weight,
    size: req.body.size,
    metal: {
      _id: metal._id,
      name: metal.name,
    },
    piece: {
      _id: piece._id,
      name: piece.name,
    },
    stone: {
      _id: stone._id,
      name: stone.name,
    },
    type: {
      _id: type._id,
      name: type.name,
    },
  });
  await jewel.save();
  console.log(jewel);

  res.send(jewel);
});

router.put("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const metal = await Metal.findById(req.body.metalId);
  if (!metal) return res.status(400).send("Invalid Metal");

  const piece = await Piece.findById(req.body.pieceId);
  if (!piece) return res.status(400).send("Invalid Piece");

  const stone = await Stone.findById(req.body.stoneId);
  if (!stone) return res.status(400).send("Invalid Stone");

  const jewel = await Jewel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      productImage: req.file.filename,
      contactNumber: req.body.contactNumber,
      contactPerson: req.body.contactPerson,
      metal: {
        _id: metal._id,
        name: metal.name,
      },
      piece: {
        _id: piece._id,
        name: piece.name,
      },
      stone: {
        _id: stone._id,
        name: stone.name,
      },
      type: {
        _id: type._id,
        name: type.name,
      },
    },

    { new: true }
  );

  if (!jewel)
    return res.status(404).send("The jewel with given ID was not found");

  res.send(jewel);
});

router.delete("/delete/:id", auth, async (req, res) => {
  const jewel = await Jewel.findByIdAndRemove(req.params.id);

  if (!jewel)
    return res.status(404).send("The jewel with the given ID was not found.");
  const jewels = await Jewel.find().sort("name");

  res.send(jewels);
});

router.put("/jewel", async (req, res) => {
  const piece = await Jewel.findById(req.body.id);
  if (!piece)
    return res.status(404).send("The Jewel with the given ID was not found.");

  res.send(piece);
});
module.exports = router;
