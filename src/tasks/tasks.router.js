const express = require("express");
const { StatusCodes } = require("http-status-codes")
const { body, validationResult } = require("express-validator")
const tasksController = require("./tasks.controller.js");
const createTaskValidator = require("./validators/createTask.validator.js")

const tasksRouter = express.Router();

tasksRouter.get("/tasks", tasksController.handleGetTask);

tasksRouter.post("/tasks", createTaskValidator, 

  (req, res) => {
    const result = validationResult(req);
  
    if(result.isEmpty()){
      return tasksController.handlePostTask(req,res);//the args didn't passed by sir
    }else{
      res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
  }
);

tasksRouter.patch("/tasks", tasksController.handlePatchTask);
tasksRouter.delete("/tasks", tasksController.handleDeleteTask);

module.exports = tasksRouter;

// configured router using methods on router object  