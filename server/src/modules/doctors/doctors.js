const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    experience: Number,
    phone: String,
    email: String,
    availability: String
},
{ timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);