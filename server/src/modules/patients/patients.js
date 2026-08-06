const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
    {
    patientId: {
      type: String,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String
    },
    bloodGroup: {
      type: String
    },
    allergies: {
      type: String
    },
    medicalHistory: {
      type: String
    },
    insuranceDetails: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);