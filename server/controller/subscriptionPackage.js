const SubscriptionPackage = require('../models/subscriptionPackage');

const addSubscriptionPackage = async (req, res) => {
  try {
    const { name, duration, connections, price, pricePerMonth } = req.body;
    const newSubscriptionPackage = new SubscriptionPackage({
      name,
      duration,
      connections,
      price,
      pricePerMonth
    });

    await newSubscriptionPackage.save();
    res.status(201).json({ success: true, data: newSubscriptionPackage });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const fetchSubscriptionPackage = async (req, res) => {
  try {
    const { duration, connections } = req.query;

    let subscriptionPackages;

    const query = {
      duration: Number(duration),
      connections: Number(connections)
    };

    if (duration && connections) {
      subscriptionPackages = await SubscriptionPackage.findBy(query);
    } else {
      subscriptionPackages = await SubscriptionPackage.find();
    }

    if (!subscriptionPackages) {
      return res.status(404).json({ success: false, message: 'No subscription package found'});
    }

    res.status(200).json({ success: true, data: subscriptionPackages });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  addSubscriptionPackage,
  fetchSubscriptionPackage
};
