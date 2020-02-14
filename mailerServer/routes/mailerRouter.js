const express = require("express"),
  mailerRouter = express.Router(),
  mailerController = require("../controllers/mailerController");

mailerRouter.post("/sendemail", mailerController.sendMessage);

module.exports = mailerRouter;
