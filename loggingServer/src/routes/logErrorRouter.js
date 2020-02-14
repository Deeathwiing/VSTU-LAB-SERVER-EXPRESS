const express = require("express"),
  logRouter = express.Router(),
  logErrorController = require("../controllers/logErrorController");

logRouter.post("/logError", logErrorController.createLog);

module.exports = logRouter;
