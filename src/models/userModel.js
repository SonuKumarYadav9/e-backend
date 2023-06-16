const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
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
      mobile: {
        type: Number,
        required: true,
        unique: true,
      },

      password: {
        type: String,
        required: true,
      },
      
      role: {
        type: String,
        enum: [ 'master', 'distributer', 'retailer'],
        required: true
      },
      parent_id: {
        type : mongoose.Schema.Types.ObjectId
      },

      aadhar: {
        type: Number,
        required: true,
        unique: true,
      },
      account: {
        type: Number,
        required: true,
        unique: true,
      },
      bank: {
        type: String,
        required: true,
      },
      pan: {
        type: String,
        required: true,
        unique: true,
      },
      ifsc: {
        type: String,
        required: true,

      },
      shopeName: {
        type: String,
        required: true,
 
      },
      address: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      pinCode: {
        type: Number,
        required: true,
      },
      block: {
        type: String,
      },

    },
  { timestamps: true }
);



module.exports = mongoose.model("user", userSchema);
