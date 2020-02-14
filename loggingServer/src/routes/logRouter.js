const express = require("express"),
  logRouter = express.Router(),
  logController = require("../controllers/logController");

logRouter.post("/log", logController.createLog);

module.exports = logRouter;
