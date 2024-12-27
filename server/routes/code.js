const app = require('express');
const codeRouter = app.Router();

const codeController = require('../controller/codeController');

codeRouter.post('/create-code', codeController.createCode);
codeRouter.get('/fetch-all', codeController.fetchAllCodes);
codeRouter.post('/delete-code', codeController.deleteCode);
codeRouter.post('/update-code', codeController.updateCode);
codeRouter.post("/getusersubscription", codeController.getUserSubscription);
codeRouter.post("/getusersubscode", codeController.getUserSubscode);
module.exports = codeRouter;
