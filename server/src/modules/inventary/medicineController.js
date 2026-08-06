const Medicine = require("./medicine");

// Add Medicine
const createMedicine = async (req, res) => {
  try {
    const { medicineName, category, quantity, price, expiryDate } = req.body;

    if (!medicineName || !category || !quantity || !price || !expiryDate) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const medicine = await Medicine.create({
      medicineName,
      category,
      quantity,
      price,
      expiryDate,
    });

    res.status(201).json(medicine);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Medicines
const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get One Medicine
const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    res.json(medicine);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Medicine
const updateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    res.json(medicine);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Medicine
const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    res.json({
      message: "Medicine deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createMedicine,
  getMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
};