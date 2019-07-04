const express = require("express");
const userController = require("../controllers/userController.js");
const userRouter = express.Router();

userRouter.use("/login", userController.login);
userRouter.use("/registration", userController.registration);
userRouter.use("/addUser", userController.addUser);
userRouter.use("/enter", userController.enter);
userRouter.use("/logout", userController.logout);
 
module.exports = userRouter;