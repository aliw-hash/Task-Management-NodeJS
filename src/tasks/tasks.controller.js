const {StatusCodes} = require("http-status-codes");
const createTaskProvider = require("./providers/createTask.provider.js")
const getTaskProvider = require("./providers/getTask.provider.js");

async function handleGetTask(req,res){
  const tasks = await getTaskProvider(req,res);
  res.status(StatusCodes.OK).json(tasks);
}

async function handlePostTask(req,res){
  const task = await createTaskProvider(req, res);
  res.status(StatusCodes.CREATED).json(task);
}

function handlePatchTask(req,res){
  res.send("Patch task controller");
}

function handleDeleteTask(req,res){
  res.send("DELETE task controller");
}

module.exports = {handleGetTask,handlePostTask,handlePatchTask,handleDeleteTask};