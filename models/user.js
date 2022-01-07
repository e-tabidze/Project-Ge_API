const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    maxlength: 1024,
  },
  repeat_password: {
    type: String,
    required: true,
    maxlength: 1024,
  },
  favorite_products: {
    type: Array,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET
  );
  return token;
};

const User = mongoose.model("Users", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().max(50),
    email: Joi.string().email().max(255),
    password: Joi.string().max(255).min(8),
    repeat_password: Joi.any()
      .valid(Joi.ref("password"))
      // .required()
      .error(() => {
        return { message: "The passwords don't match." };
      }),
    favorite_products: Joi.any(),
  };

  return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validate = validateUser;
