const { Jewel, validate } = require("../models/jewel");
const { Metal } = require("../models/metal");
const { Piece } = require("../models/piece");
const { Stone } = require("../models/stone");
// const { Type } = require("../models/type");
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

router.post("/add", auth, upload.array("productImage"), async (req, res) => {
  const { error } = validate(req.body);
  console.log(error, "<==== Jewel Error");
  if (error) return res.status(400).send(error.details[0].message);
  const metal = await Metal.findById(req.body.metal);
  console.log(JSON.stringify(req.body.metal._id), "<=== Metal Error");
  if (!metal) return res.status(400).send("Invalid Metal");
  const piece = await Piece.findById(req.body.piece);
  console.log(piece, "<=== Piece Error");
  if (!piece) return res.status(400).send("Invalid Piece");
  const stone = await Stone.findById(req.body.stone);
  console.log(stone, "<=== Stone Error");
  if (!stone) return res.status(400).send("Invalid Stone");

  let imageArray = req.files.map((file) => {
    return file.path;
  });
  console.log(imageArray, "<--- Image Array");
  let userObject = jwt.decode(req.headers["x-auth-token"]);
  // datecreator
  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  let dateNow = Date.now();
  let newDateNow = new Date(dateNow);
  let expDate = newDateNow.addDays(30);
  // console.log(expDate.toDateString());
  console.log(req.body, "NEW JEWEL");
  let jewel = new Jewel({
    name: req.body.name,
    // duration: req.body.duration,
    price: req.body.price,
    description: req.body.description,
    userId: userObject._id,
    standard: req.body.standard,
    productImage: imageArray,
    contactNumber: req.body.contactNumber,
    contactPerson: req.body.contactPerson,
    weight: req.body.weight,
    size: req.body.size,
    expired: false,
    expirationDate: expDate,
    creationDate: newDateNow,
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
    // type: {
    //   _id: type._id,
    //   name: type.name,
    // },
  });

  await jewel.save();
  console.log(jewel);

  res.send(jewel);
});

router.post("/similar", async (req, res) => {
  let data = await Jewel.find();
  let filteredData = data.filter((item) => item.piece._id == req.body.type);
  // console.log(filteredData, req.body.type);
  res.send(filteredData);
});

router.post(
  "/update/:id",
  auth,
  upload.array("productImage"),
  async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const metal = await Metal.findById(req.body.metal);
    if (!metal) return res.status(400).send("Invalid Metal");

    const piece = await Piece.findById(req.body.piece);
    if (!piece) return res.status(400).send("Invalid Piece");

    const stone = await Stone.findById(req.body.stone);
    if (!stone) return res.status(400).send("Invalid Stone");

    let imageArray = req.files.map((file) => {
      return file.path;
    });

    console.log(req.body, "Body");
    var exisArr = req.body.existingImages.split(",");

    exisArr.map((item) => {
      imageArray.push(item);
    });

    const jewel = await Jewel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        productImage: imageArray,
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
        // type: {
        //   _id: type._id,
        //   name: type.name,
        // },
      },
      { new: true }
    );
    if (!jewel)
      return res.status(404).send("The jewel with given ID was not found");
    res.send(jewel);
  }
);

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
