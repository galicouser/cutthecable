const User = require('./user');
const SubscriptionPlan = require('./subscriptionPlan');

const subscribeUser = async (userId, subscriptionPlanId) => {
  try {
    const user = await User.findById(userId);
    const subscriptionPlan = await SubscriptionPlan.findById(subscriptionPlanId);

    if (user.subscription) {
      return renewSubscription(userId, subscriptionPlanId);
    }

    user.subscription = {
      plan: subscriptionPlan._id,
      startDate: new Date(),
      endDate: new Date(Date.now() + subscriptionPlan.plan_length * 30 * 24 * 60 * 60 * 1000) // i.e. plan_length = 1 (1 month length)
    };
    await user.save();
    return user;
  } catch (error) {
    console.error("Error subscribing user:", error);
    throw error;
  }
};

const checkSubscriptionStatus = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user.subscription) {
      return { active: false, message: "User is not subscribed" };
    }

    const currentDate = new Date();
    if (user.subscription.endDate < currentDate) {
      return { active: false, message: "Subscription expired" };
    }

    return { active: true, endDate: user.subscription.endDate };
  } catch (error) {
    console.error("Error checking subscription status:", error);
    throw error;
  }
};

const renewSubscription = async (userId, subscriptionPlanId) => {
  try {
    const user = await User.findById(userId);
    const subscriptionPlan = await SubscriptionPlan.findById(subscriptionPlanId);

    if (!user.subscription) {
      return { success: false, message: "User is not subscribed" };
    }

    user.subscription.endDate = new Date(Date.now() + subscriptionPlan.plan_length * 30 * 24 * 60 * 60 * 1000);

    await user.save();
    return { success: true, message: "Subscription renewed successfully" };
  } catch (error) {
    console.error("Error renewing subscription:", error);
    throw error;
  }
};

module.exports = {
  subscribeUser,
  checkSubscriptionStatus,
  renewSubscription
};

