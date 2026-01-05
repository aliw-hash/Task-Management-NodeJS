const express = require("express");
const { StatusCodes } = require("http-status-codes")
const { validationResult } = require("express-validator")
const tasksController = require("./tasks.controller.js");
const createTaskValidator = require("./validators/createTask.validator.js")
const getTasksValidator = require("./validators/getTasks.validator.js");
const updateTaskValidator = require("./validators/updateTask.validator.js")
const deleteTaskValidator = require("./validators/deleteTask.validator.js");
const authToken = require("../middleware/authenticateToken.middleware.js");

const tasksRouter = express.Router();

tasksRouter.get(
  "/tasks", 
  [getTasksValidator, authToken], 
  (req, res)=>{
  const result = validationResult(req);
  if(result.isEmpty()){
      return tasksController.handleGetTask(req,res);
    }else{
      res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
});

tasksRouter.post(
  "/tasks", 
  [createTaskValidator, authToken], 
  (req, res) => {
    const result = validationResult(req);
  
    if(result.isEmpty()){
      return tasksController.handlePostTask(req,res);
    }else{
      res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
  }
);

tasksRouter.patch(
  "/tasks",
  [updateTaskValidator, authToken],
  (req, res)=>{
  const result = validationResult(req);
  if(result.isEmpty()){
      return tasksController.handlePatchTask(req,res);
    }else{
      res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
});

tasksRouter.delete(
  "/tasks",
  [deleteTaskValidator, authToken], 
  (req, res)=>{
  const result = validationResult(req);
  if(result.isEmpty()){
      return tasksController.handleDeleteTask(req,res);
    }else{
      res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
});

module.exports = tasksRouter;

// configured router using methods on router object  