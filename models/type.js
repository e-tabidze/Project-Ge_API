const Joi = require("joi");
const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 15,
  },
});

const Type = mongoose.model("Types", typeSchema);

function validateType(type) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(type, schema);
}

module.exports.Type = Type;
module.exports.validate = validateType;
module.exports.typeSchema = typeSchema;
