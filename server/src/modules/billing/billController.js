const Bill = require("./bill");

// Create Bill
const createBill = async (req, res) => {
  try {
    const { patient, amount, paymentStatus } = req.body;

    if (!patient || !amount) {
      return res.status(400).json({
        message: "Patient and amount are required",
      });
    }

    const bill = await Bill.create({
      patient,
      amount,
      paymentStatus,
    });

    res.status(201).json({
      message: "Bill created successfully",
      bill,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Bills
const getBills = async (req, res) => {
  try {
    const bills = await Bill.find().populate("patient", "name");

    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Bill By ID
const getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id).populate(
      "patient",
      "name"
    );

    if (!bill) {
      return res.status(404).json({
        message: "Bill not found",
      });
    }

    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Bill
const updateBill = async (req, res) => {
  try {
    const bill = await Bill.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    ).populate("patient", "name");

    if (!bill) {
      return res.status(404).json({
        message: "Bill not found",
      });
    }

    res.status(200).json({
      message: "Bill updated successfully",
      bill,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Bill
const deleteBill = async (req, res) => {
  try {
    const bill = await Bill.findByIdAndDelete(req.params.id);

    if (!bill) {
      return res.status(404).json({
        message: "Bill not found",
      });
    }

    res.status(200).json({
      message: "Bill deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBill,
  getBills,
  getBillById,
  updateBill,
  deleteBill,
};