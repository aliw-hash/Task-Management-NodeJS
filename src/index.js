const express = require("express");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const { StatusCodes } = require("http-status-codes");
const responseFormatter = require("./middleware/responseFormatter.js");
const tasksRouter = require("./tasks/tasks.router.js");
const authRouter = require("./auth/auth.router.js");
const usersRouter = require("./users/users.router.js");
const mongoose = require("mongoose");
const expressWinstonLogger = require("./middleware/expressWinston.middleware.js");
const dotenv = require("dotenv");
const cors = require("cors");

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const envFile = `.env.${process.env.NODE_ENV}`;
dotenv.config({path:envFile});

const app = express();
const port = parseInt(process.env.PORT);

app.use(express.json());

const corsOption = {
  origin:["example.com", "example2.com"]
}
app.use(cors());        //allows request from every origin

let accessLogStream = fs.createWriteStream(
  path.join(__dirname,"..", "access.log"),
  {flags:"a"}
);

app.use(morgan("combined",{stream:accessLogStream}));
app.use(responseFormatter); //it's like we are difining the formatter first to all upcoming response
app.use(expressWinstonLogger);

//define routes
app.use("/",tasksRouter);   //middleware
app.use("/auth",authRouter);   //middleware
app.use("/users",usersRouter);  //middleware

app.use((req, res)=>{
  res.status(StatusCodes.NOT_FOUND).json(null);
})

async function bootstrap(){
  try{
    await mongoose.connect(process.env.DATABASE_URL,
      {dbName:process.env.DATABASE_NAME}
    );
    console.log("DB is connected");
    app.listen(port,() => {
  console.log(`app is listening ${port}`);
}); //first configure the app, then start it.

  }catch(error){
    console.log("error while connecting to the DB");
    process.exit(1);
  }
}

bootstrap();