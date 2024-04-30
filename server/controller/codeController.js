const Code = require('../models/Code');

const createCode = async (req, res) => {
  try {
    const code = new Code(req.body);

    await code.save();
    res.status(201).json({ success: true, data: code });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const fetchAllCodes = async (req, res) => {
  try {
    const codes = await Code.find();
    res.status(200).json({ success: true, data: codes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteCode = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedCode = await Code.findByIdAndDelete(id);

    if (!deletedCode) {
      return res.status(404).json({ error: 'Code not found.' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting redeem code:', error);
    res.status(500).json({ error: 'An error occurred while deleting the code.' });
  }
}

const findCode = async (duration, connections) => {
  const codes = await Code.find({ duration, activated: false, assignee: null }).limit(connections);

  if (!codes) {
    console.error('No available code found');
    return;
  }

  return codes;
}

const updateCode = async (id, userId) => {
  try {
    const code = await Code.findById(id);

    if (!code) {
      console.error('No available code found');
      return;
    }

    code.activated = true;
    code.assignee = userId;
    await code.save();

    return code;
  } catch (error) {
    console.error('Error updating codes:', error);
    throw error;
  }
};

module.exports = {
  fetchAllCodes,
  createCode,
  deleteCode,
  findCode,
  updateCode,
}
