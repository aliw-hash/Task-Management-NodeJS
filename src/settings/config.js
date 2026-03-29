const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const { StatusCodes } = require("http-status-codes");
const responseFormatter = require("../middleware/responseFormatter.js");
const tasksRouter = require("../tasks/tasks.router.js");
const authRouter = require("../auth/auth.router.js");
const usersRouter = require("../users/users.router.js");
const expressWinstonLogger = require("../middleware/expressWinston.middleware.js");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swagger.config.js");

function configApp(app){
  app.use(cors());        //allows request from every origin

  let accessLogStream = fs.createWriteStream(
    path.join(__dirname,"..", "access.log"),
    {flags:"a"}
  );

  app.use(morgan("combined",{stream:accessLogStream}));
  app.use(responseFormatter); //it's like we are difining the formatter first to all upcoming response
  app.use(expressWinstonLogger);

  //define routes
  app.use("/api/",tasksRouter);   //middleware
  app.use("/api/auth",authRouter);   //middleware
  app.use("/api/users",usersRouter);  //middleware

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

  app.use((req, res)=>{
    res.status(StatusCodes.NOT_FOUND).json(null);
  })
}

module.exports = configApp;