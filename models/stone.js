const Joi = require("joi");
const mongoose = require("mongoose");

const stoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

const Stone = mongoose.model("Stones", stoneSchema);

function validateStone(stone) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(stone, schema);
}

module.exports.Stone = Stone;
module.exports.validate = validateStone;
module.exports.stoneSchema = stoneSchema;
