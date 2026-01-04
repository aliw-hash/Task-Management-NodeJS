const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");
const {matchedData} = require("express-validator");

async function loginUserProvider(req, res){
  const validatedData = matchedData(req);

  try{
    return res.status(StatusCodes.OK).json({});
  }catch(error){
    errorLogger("Error while logging in the user", req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason:"unable to process the login request, please try later"
    });
  }
}

module.exports = loginUserProvider;