const Medicine = require("./medicine");

// Add Medicine
const createMedicine = async (req, res) => {
  try {
    const { name, manufacturer, quantity, price } = req.body;

    if (
      !name ||
      !manufacturer ||
      quantity === undefined ||
      price === undefined
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const medicine = await Medicine.create({
      name: name.trim(),
      manufacturer: manufacturer.trim(),
      quantity: Number(quantity),
      price: Number(price),
    });

    res.status(201).json(medicine);
  } catch (error) {
    console.error("Create Medicine Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Medicines
const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find().sort({ createdAt: -1 });

    res.status(200).json(medicines);
  } catch (error) {
    console.error("Get Medicines Error:", error);

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

    res.status(200).json(medicine);
  } catch (error) {
    console.error("Get Medicine Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Medicine
const updateMedicine = async (req, res) => {
  try {
    const { name, manufacturer, quantity, price } = req.body;

    const medicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      {
        name,
        manufacturer,
        quantity: Number(quantity),
        price: Number(price),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    res.status(200).json(medicine);
  } catch (error) {
    console.error("Update Medicine Error:", error);

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

    res.status(200).json({
      message: "Medicine deleted successfully",
    });
  } catch (error) {
    console.error("Delete Medicine Error:", error);

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