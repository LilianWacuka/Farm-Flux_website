const Farm = require('../models/Farm');

const createFarm = async (req, res) => {
  try {
    const farm = await Farm.create({ ...req.body, userId: req.user.id });
    res.status(201).json(farm);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFarms = async (req, res) => {
  try {
    const farms = await Farm.find({ userId: req.user._id });
    res.json(farms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateFarm = async (req, res) => {
  try {
    const farm = await Farm.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(farm);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createFarm, getFarms, updateFarm };