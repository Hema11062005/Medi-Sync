const Doctor = require("./doctors");

// Add doctor
const createDoctor = async (req, res) => {
    try {
        const doctor = new Doctor(req.body);
        await doctor.save();

        res.status(201).json({
            message: "Doctor added successfully",
            doctor
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get all doctors
const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();

        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createDoctor,
    getDoctors
};