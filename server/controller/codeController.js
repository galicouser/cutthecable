const Code = require('../models/Code');
const redeemCode = require('../models/redeem');
const User = require("../models/user");
const Subscription  = require("../models/subscription");

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
const updateCode = async (req, res) => {
  try {
    console.log(req);
    const { id, userId, action } = req.body;
    const code = await Code.findById(id);

    if (!code) {
      console.error('No code found with the provided id');
      return res.status(404).json({ result: 'error', message: 'No code found' });
    }
    if(code.expired == true){
      console.error('code is expired');
      return res.status(404).json({ result: 'error', message: 'code is expired' });
    }

    let prepaycode = code.code;
    const rcode = await redeemCode.findOne({ code:prepaycode });

    if (!rcode) {
      console.error('No redeem code found for the given prepaycode');
      return res.status(404).json({ result: 'error', message: 'No redeem code found' });
    }

    if (action === 'release') {
      code.activated = false;
      code.assignee = null;
      rcode.purchase_date = '';
      rcode.status = 'Pending';
    } else if (action === 'assign') {
      code.activated = true;
      code.assignee = userId;
    } else {
      console.error('Invalid action');
      return res.status(400).json({ result: 'error', message: 'Invalid action' });
    }

    await code.save();
    await rcode.save();

    res.json({ result: 'success', message: 'Code updated successfully' });
  } catch (err) {
    // Log the error
    console.error('Error:', err);

    res.status(500).json({ result: 'error', message: 'Failed to update code', server_err: err });
  }
};


const getUserSubscription = async (req, res) => {
  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    console.log(user._id);
    // Find all entries in the RedeemCode model associated with the user's email
    const subscription = await Code.find({ assignee:user._id });
    if (subscription.length === 0) {
      return res.status(200).send({ message: 'No entries found' });
    }

 // Push the email into each subscription entry
    const updatedSubscription = subscription.map((entry) => ({
      ...entry.toObject(), // Convert entry to plain object if it's a Mongoose document
      email,
    }));

    // Filter active entries
    const activeEntries = updatedSubscription.filter((entry) => entry.activated == true);

    // Create a response object
    const response = {
      message: `Fetched ${subscription.length} entries`,
      active: activeEntries,
      data: updatedSubscription,
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};

const getUserSubscode = async (req, res) => {
  const { email,code } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    // let prepaycode = code.code;

    if (!user) {
      return res.status(404).send({result: 'error', message: 'User not found' });
    }
    const user_check_for_code = await Subscription.findOne({ subscription_code:code,user:email });
    if (!user_check_for_code) {
      return res.status(404).send({result: 'error', message: 'code not assigned to user' });
    }
    const rcode = await redeemCode.findOne({ code:code });

    if (!rcode) {
      console.error('code not found');
      return res.status(404).json({ result: 'error', message: 'No code found' });
    }

    if(rcode.status != 'Expired'){
      console.error('please try again with expired code');
      return res.status(404).json({ result: 'error', message: 'code not expired' });
    }

    // Create a response object
    const response = {
      result: 'success',
      message: `code found`
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};


module.exports = {
  fetchAllCodes,
  createCode,
  deleteCode,
  findCode,
  updateCode,
  getUserSubscription,
  getUserSubscode
}
