const app = require('express');
const codeRouter = app.Router();

const codeController = require('../controller/codeController');

codeRouter.post('/create-code', codeController.createCode);
codeRouter.get('/fetch-all', codeController.fetchAllCodes);
codeRouter.post('/delete-code', codeController.deleteCode);

module.exports = codeRouter;
