const Task = require("../task.schema.js");

async function getTaskProvider(req,res){
  return await Task.find();
}

module.exports = getTaskProvider;