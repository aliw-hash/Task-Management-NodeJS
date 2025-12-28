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

const app = express();
const port = 3001;
const cors = require("cors");


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

app.use("/",tasksRouter);   //middleware
app.use("/auth",authRouter);   //middleware
app.use("/users",usersRouter);

app.use((req, res)=>{
  res.status(StatusCodes.NOT_FOUND).json(null);
})

async function bootstrap(){
  try{
    await mongoose.connect("mongodb+srv://aliw24136_db:passForDB@cluster0.fzdbkwz.mongodb.net/?appName=Cluster0",
      {dbName:"fullstackTask"}
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