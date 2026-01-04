const loginUserProvider = require("./provider/loginUser.provider.js");

async function handleLogin(req, res){
  return await loginUserProvider(req, res); 
}

module.exports = {handleLogin};