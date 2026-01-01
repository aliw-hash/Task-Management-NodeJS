const {StatusCodes} = require("http-status-codes");
const createTaskProvider = require("./providers/createTask.provider.js")
const getTaskProvider = require("./providers/getTask.provider.js");
const updateTaskProvider = require("./providers/updateTask.provider.js");
const deleteTaskProvider = require("./providers/deleteTask.provider.js");

async function handleGetTask(req,res){
  return await getTaskProvider(req,res);
}

async function handlePostTask(req,res){
  return await createTaskProvider(req, res);
}

async function handlePatchTask(req,res){
  const updatedTask = updateTaskProvider(req, res);
  res.status(StatusCodes.OK).json(updatedTask);
}
async function handleDeleteTask(req,res){
  const deletedTask = await deleteTaskProvider(req, res);
  res.status(StatusCodes.OK).json(deletedTask);
}

module.exports = {handleGetTask,handlePostTask,handlePatchTask,handleDeleteTask};