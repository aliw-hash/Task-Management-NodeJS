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
  "/tascs", 
  [getTasksValidator, authToken], 
  (req, res)=>{
  const result = validationResult(req);
  if(result.isEmpty()){
      return tasksController.handleGetTask(req,res);
    }else{
      res.status(StatusCodes.BAD_REQUEST).json(result.array());
    }
});

/**
 * @swagger
 * 
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 * 
 * /tasks:
 *  post:
 *    summary: Create a new task
 *    tags: [Tasks]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Task'
 *    responses:
 *      201:
 *        description: Task created successfully
 *        content:
 *          application/json:
 *            example:
 *              status: success
 *              statusCode: 201
 *              message: created
 *              data:
 *                _id: 69ik8923hf6e299701acc91d
 *                title: exercise
 *                description: weight loss excercise
 *                status: todo
 *                priority: normal
 *                dueDate: 2025-01-01T12:00:00Z
 *      401:
 *        description: Not Authorised Error
 *        content:
 *          application/json:
 *            example:
 *              status: error
 *              statusCode: 401
 *              message: Unauthorize
 *              error:
 *                message: you are not authorized to perform this request
 *      403:
 *        description: Forbidden Error
 *        content:
 *          application/json:
 *            example:
 *              status: error
 *              statusCode: 403
 *              message: Forbidden
 *              error:
 *                message: Plz login again, invalid token
 */

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