const express = require("express");
const statsController = require("../controllers/statsController.js");
const statRouter = express.Router();

statRouter.use("/statistics", statsController.statistics);
module.exports = statRouter;