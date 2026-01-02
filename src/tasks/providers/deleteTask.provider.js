const Task = require("../task.schema.js");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js")

async function deleteTaskProvider(req, res){
  try{
    const task = await Task.deleteOne({ _id: req.body["_id"] });
    return res.status(StatusCodes.OK).json(task);
  }catch(error){
    errorLogger("Error while deleting the task",req,error);
    res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason:"unable to process the deletion request, please try later"
    });
  }
}

module.exports = deleteTaskProvider;