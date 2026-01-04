const Task = require("../task.schema.js");
const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");
const {matchedData} = require("express-validator");

async function deleteTaskProvider(req, res){
  const validatedData = matchedData(req);
  try{
    const deletedtask = await Task.deleteOne({ _id: validatedData["_id"] });
    return res.status(StatusCodes.OK).json(deletedtask);
  }catch(error){
    errorLogger("Error while deleting the task",req,error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason:"unable to process the deletion request, please try later"
    });
  }
}

module.exports = deleteTaskProvider;