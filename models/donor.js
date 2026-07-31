const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [18, "Age should be at least 18"],
    max: [75, "Age should not exceed 75"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  bloodgroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: true,
  },
  mobilenumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: "Contact number must be exactly 10 digits.",
    },
  },
  city: {
    type: String,
    required: true,
    maxlength: 50,
  },
  address: {
    type: String,
    required: true,
    maxlength: 50,
  },
  lastDonationDate: {
    type: Date,
    required: true,
  },
  available: { type: Boolean, default: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

module.exports = mongoose.model("donors", donorSchema);
