const Joi = require("joi");
const mongoose = require("mongoose");

const pieceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

const Piece = mongoose.model("Pieces", pieceSchema);

function validatePiece(piece) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(piece, schema);
}

module.exports.Piece = Piece;
module.exports.validate = validatePiece;
module.exports.pieceSchema = pieceSchema;
