const { StatusCodes } = require("http-status-codes"); 
const createUserProvider = require("./providers/createUserProvider.js");

async function handleCreateUser(req, res){
  const user = await createUserProvider(req, res);
  res.status(StatusCodes.CREATED).json(user);
}

module.exports = { 
  handleCreateUser,
};