const { StatusCodes } = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper.js");
const {matchedData} = require("express-validator");

const bcrypt = require("bcryptjs");
const getUserByEmail = require("../../users/providers/getUserByEmail.provider.js");
const generateTokenProvider = require("./generateToken.provider.js");

async function loginUserProvider(req, res){
  const validatedData = matchedData(req);

  try{
    const user = await getUserByEmail(validatedData.email);
    const result = await bcrypt.compare(validatedData.password, user.password);
    if(!result){
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({
          message:"wrong email provided"});
    }

    const token = generateTokenProvider(user);

    return res.status(StatusCodes.OK).json({
      accessToken: token,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });

  }catch(error){
    errorLogger("Error while logging in the user", req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      reason:"unable to process the login request, please try later"
    });
  }
}

module.exports = loginUserProvider;