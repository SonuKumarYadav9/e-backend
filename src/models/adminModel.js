const mongoose = require("mongoose");

const adminShema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      
      role: {
        type: String,
        default: 'admin',
      },

      balance:{
        type:Number,
        default:0
      },
      
    },
  { timestamps: true }
);

module.exports = mongoose.model("admin", adminShema);
