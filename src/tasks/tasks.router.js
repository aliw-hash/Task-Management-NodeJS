const express = require("express");
const tasksRouter = express.Router();
const tasksController = require("./tasks.controller.js");

tasksRouter.get("/tasks", tasksController.handleGetTask);
tasksRouter.post("/tasks", tasksController.handlePostTask);
tasksRouter.patch("/tasks", tasksController.handlePatchTask);
tasksRouter.delete("/tasks", tasksController.handleDeleteTask);

module.exports = tasksRouter;

// configured router using methods on router object  