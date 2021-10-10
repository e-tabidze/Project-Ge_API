const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const configJS = require("../config/config");

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
});

userSchema.methods.generateAuthToken = function () {
  console.log(this.name, this.email);
  const token = jwt.sign(
    { _id: this._id, name: this.name, email: this.email },
    // config.get("jwtPrivateKey")
    configJS.secret
  );
  return token;
};

const User = mongoose.model("Users", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().max(50).required(),
    email: Joi.string().email().max(255).required(),
    password: Joi.string().max(255).min(8).required(),
    repeat_password: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .error(() => {
        return { message: "The passwords don't match." };
      }),
  };

  return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validate = validateUser;
