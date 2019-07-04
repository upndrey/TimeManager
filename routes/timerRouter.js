const express = require("express");
const timerController = require("../controllers/timerController.js");
const timerRouter = express.Router();

timerRouter.use("/startTimer", timerController.startTimer);
timerRouter.use("/addTimer", timerController.addTimer);
timerRouter.use("/stopTimer", timerController.stopTimer);
timerRouter.use("/deleteTimers", timerController.deleteTimers);
timerRouter.use("/main", timerController.main);
module.exports = timerRouter;