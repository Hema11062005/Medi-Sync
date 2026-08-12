const Appointment = require("./appointments");

// Create Appointment
const createAppointment = async (req, res) => {
  try {
    const {
      patient,
      doctor,
      appointmentDate,
      reason,
    } = req.body;

    // Validate required fields
    if (!patient) {
      return res.status(400).json({
        message: "Patient is required",
      });
    }

    if (!doctor) {
      return res.status(400).json({
        message: "Doctor is required",
      });
    }

    if (!appointmentDate) {
      return res.status(400).json({
        message: "Appointment date is required",
      });
    }

    if (!reason || !reason.trim()) {
      return res.status(400).json({
        message: "Reason is required",
      });
    }

    // Create appointment
    const appointment = await Appointment.create({
      patient,
      doctor,
      appointmentDate: new Date(appointmentDate),
      reason: reason.trim(),
      status: "Scheduled",
    });

    res.status(201).json({
      message: "Appointment created successfully",
      appointment,
    });
  } catch (error) {
    console.error("Create Appointment Error:", error);

    // Invalid MongoDB ObjectId
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid patient or doctor ID",
      });
    }

    // Mongoose validation error
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};


// Get All Appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name")
      .populate("doctor", "name")
      .sort({ appointmentDate: 1 });

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Get Appointments Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// Get Appointment By ID
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("patient", "name")
      .populate("doctor", "name");

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.status(200).json(appointment);
  } catch (error) {
    console.error("Get Appointment Error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid appointment ID",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};


// Update Appointment
const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("patient", "name")
      .populate("doctor", "name");

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      message: "Appointment updated successfully",
      appointment,
    });
  } catch (error) {
    console.error("Update Appointment Error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid appointment ID",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};


// Delete Appointment
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(
      req.params.id
    );

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    console.error("Delete Appointment Error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid appointment ID",
      });
    }

    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
};