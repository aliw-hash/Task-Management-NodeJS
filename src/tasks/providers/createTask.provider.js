const Task = require("../task.schema.js");
const { matchedData } = require("express-validator");
const {StatusCodes} = require("http-status-codes");
const logger = require("../../helpers/winston.helper.js")

async function createTaskProvider(req,res){
  const validatedResult = matchedData(req);

  //inside it req.body can have extra field as well
  const task = new Task(validatedResult);
  try{
    await task.save();
    return res.status(StatusCodes.CREATED).json(task);
  } catch(error){
    console.log(error);
    logger.error(`Error creating a new task: ${error.message}`,{
      errorCode: error.code,
      errorName: error.name,
      method: req.method,
      url: req.originalUrl,
      error: error,
    });

    res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason: "unable to process your request at the moment, Please try later."
    });
  }
}

module.exports = createTaskProvider;