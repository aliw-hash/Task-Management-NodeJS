const User = require("../user.schema.js");
const {matchedData} = require("express-validator");
const {StatusCodes} = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js")

async function createUserProvider(req, res){
  const validatedData = matchedData(req);
  const user = new User(validatedData);
  try{
    await user.save();
    delete user.password;
    return res.status(StatusCodes.CREATED).json(user);
  }
  catch(error){
    errorLogger("Error while creating user", req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason:"unable to creating a user, plz try later",
    });
  }
}

module.exports = createUserProvider;