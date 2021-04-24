const Joi = require("joi");
const mongoose = require("mongoose");

const metalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
});

const Metal = mongoose.model("Metals", metalSchema);

function validateMetal(metal) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(metal, schema);
}

module.exports.Metal = Metal;
module.exports.validate = validateMetal;
module.exports.metalSchema = metalSchema;
