const {StatusCodes} = require("http-status-codes");
const Task = require("./task.schema.js");

function handleGetTask(req,res){
  let response = [
    {
      title:"HomeWork",
      priority:"Urgent"
    },
    {
      title:"something-else",
      priority:"light"
    }
  ];
  
  res.status(StatusCodes.OK).json(response);
}

async function handlePostTask(req,res){
  const task = new Task({
    title:req.body.title,
    description:req.body.description,
    status:req.body.status,
    priority:req.body.priority,
    dueDate:req.body.dueDate,
  });

  await task.save();

  res.status(StatusCodes.CREATED).json(task);
}

function handlePatchTask(req,res){
  res.send("Patch task controller");
}

function handleDeleteTask(req,res){
  res.send("DELETE task controller");
}

module.exports = {handleGetTask,handlePostTask,handlePatchTask,handleDeleteTask};