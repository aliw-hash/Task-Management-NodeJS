const express = require("express");
const authRouter = express.Router();
const authController = require("./auth.controller.js");
const {validationResult} = require("express-validator");

const loginUserValidator = require("./validators/loginUser.validator.js");
const { StatusCodes } = require("http-status-codes");

authRouter.post("/login", loginUserValidator, (req, res)=>{
  const result = validationResult(req);
  if(result.isEmpty())
    return authController.handleLogin(req, res);
  else{
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

module.exports = authRouter;