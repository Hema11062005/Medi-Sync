const Lab = require("./lab");

// Create Lab Test
const createLab = async (req, res) => {
  try {
    const lab = await Lab.create(req.body);

    res.status(201).json(lab);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Lab Tests
const getLabs = async (req, res) => {
  try {
    const labs = await Lab.find().populate("patient", "name");

    res.json(labs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Lab
const updateLab = async (req, res) => {
  try {
    const lab = await Lab.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(lab);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Lab
const deleteLab = async (req, res) => {
  try {
    await Lab.findByIdAndDelete(req.params.id);

    res.json({
      message: "Lab deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createLab,
  getLabs,
  updateLab,
  deleteLab,
};