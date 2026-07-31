const mongoose = require("mongoose");

const bloodRequestSchema = new mongoose.Schema({
  patientname: {
    type: String,
    required: true,
  },

  bloodgroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: true,
  },

  unitsrequired: {
    type: Number,
    required: true,
    min: 1,
  },

  hospitalname: {
    type: String,
    required: true,
  },

  hospitallocation: {
    type: String,
    required: true,
  },

  contactnumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: "Contact number must be exactly 10 digits.",
    },
  },

  requireddate: {
    type: Date,
    required: true,
  },

  emergencylevel: {
    type: String,
    enum: ["Normal", "Urgent", "Critical"],
    required: true,
  },

  requestType: {
    type: String,
    enum: ["treatment", "surgery", "accident", "other"],
    required: true,
  },

  message: {
    type: String,
    maxlength: 300,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

module.exports = mongoose.model("bloodrequests", bloodRequestSchema);
