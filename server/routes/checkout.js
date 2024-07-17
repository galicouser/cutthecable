const app = require("express");
const checkoutRouter = app.Router();

const checkoutController = require("../controller/checkout");
// const checkoutMiddleware = require("../middleware/checkout");
// //const emailService = require("../utils/emailService");

// checkoutrouter.post("/process", checkoutontroller.stripeOrder);
checkoutRouter.get("/success", checkoutController.success);
// checkoutrouter.get("/success_paypal", checkoutontroller.success_paypal);
// checkoutrouter.get("/failure", checkoutontroller.failure);
// checkoutrouter.post('/create_order', checkoutontroller.createOrder);
checkoutRouter.post('/create-paypal', checkoutController.createPaypalOrder);
checkoutRouter.post('/create-stripe', checkoutController.createStripeOrder);

// //router.get("/send-token/:email/:verify_token", emailService.sendEmail);
// //router.get("/api/verify", authMiddleware.verifyUserEmail);



module.exports = checkoutRouter;
