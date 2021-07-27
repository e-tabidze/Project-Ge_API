const Joi = require("joi");
const mongoose = require("mongoose");
const { metalSchema } = require("./metal");
const { pieceSchema } = require("./piece");
const { stoneSchema } = require("./stone");
// const { typeSchema } = require("./type");

const jewelSchema = new mongoose.Schema({
  // duration: {
  //   type: Number,
  //   default: 30,
  // },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  piece: {
    type: pieceSchema,
    required: true,
  },
  price: {
    type: Number,
    maxlength: 10000,
  },
  metal: {
    type: metalSchema,
    required: true,
  },
  stone: {
    type: stoneSchema,
  },
  weight: {
    type: Number,
    maxlength: 10000,
  },
  size: {
    type: String,
    maxlength: 100,
  },
  standard: {
    type: String,
    maxlength: 10000,
  },
  contactNumber: {
    type: Number,
  },
  description: {
    type: String,
    maxlength: 300,
  },
  productImage: {
    type: Array,
  },
  // type: {
  //   type: typeSchema,
  // },
  userId: {
    type: String,
  },
  contactPerson: {
    type: String,
  },
  expired: { type: Boolean },
  creationDate: { type: Date },
  expirationDate: { type: Date },
});

const Jewel = mongoose.model("Jewels", jewelSchema);

function validateJewel(jewel) {
  const schema = {
    name: Joi.string().max(100),
    pieceId: Joi.string(),
    metalId: Joi.string(),
    standard: Joi.string().max(10000),
    stoneId: Joi.string(),
    size: Joi.label("ზომა"),
    weight: Joi.number().max(10000),
    // duration: Joi.number().max(100).default(30),
    price: Joi.number().max(10000),
    contactPerson: Joi.string(),
    contactNumber: Joi.string(),
    description: Joi.string().max(300),
    productImage: Joi.any(),
    // typeId: Joi.string().required(),
  };

  return Joi.validate(jewel, schema);
}

module.exports.Jewel = Jewel;
module.exports.validate = validateJewel;
