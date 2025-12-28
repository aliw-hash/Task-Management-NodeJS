const express = require("express");
const authRouter = express.Router();
const authController = require("./auth.controller.js");

authRouter.post("/login", authController.handleLogin);

module.exports = authRouter;