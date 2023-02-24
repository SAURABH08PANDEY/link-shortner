const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },

  hashCode: String,
});
module.exports = mongoose.model("Link", UserSchema);
