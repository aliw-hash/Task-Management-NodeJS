const express = require("express");
const userController = require("./users.controller.js");
const userRouter = express.Router();
const createUserValidator = require("./validators/createUser.validator.js");
const { validationResult } = require("express-validator");
const {StatusCodes} = require("http-status-codes");

userRouter.post("/create",createUserValidator,
  (req, res)=>{
    const result = validationResult(req);
    if(result.isEmpty()){
      userController.handleCreateUser(req, res);
    }  
    else{
      return res.status(StatusCodes.BAD_REQUEST).json(result.array());
      }
  }
);

module.exports = userRouter;