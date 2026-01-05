const {StatusCodes} = require("http-status-codes");
const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  
  if(!token){
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({message: "token is not provided by you",});
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
    if(err){
      return res.status(StatusCodes.FORBIDDEN).json({
        message:"please login again, invalid token",
      });
    }
    req.user = user;
    next();
  });
}

module.exports = authToken;