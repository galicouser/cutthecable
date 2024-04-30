const app = require('express');
const subscriptionPackageRouter = app.Router();

const subscriptionPackageController = require('../controller/subscriptionPackage');

subscriptionPackageRouter.post('/addSubscriptionPackage', subscriptionPackageController.addSubscriptionPackage);
subscriptionPackageRouter.get('/fetchSubscriptionPackage', subscriptionPackageController.fetchSubscriptionPackage);

module.exports = subscriptionPackageRouter;
