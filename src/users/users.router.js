const express = require("express");
const userController = require("./users.controller.js");
const userRouter = express.Router();

userRouter.post("/create",userController.handleCreateUser);

module.exports = userRouter;