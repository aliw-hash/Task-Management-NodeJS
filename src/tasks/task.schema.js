const {Schema, model} = require("mongoose");

const taskSchema = new Schema({
  title:{
    type:String,
    required:[true, "task title is required"],
    trim:true,
    maxLength:[100,"Title cannot exceed 100 characters"],
  },
  description:{
    type:String,
    required:[true, "task title is required"],
    trim:true,
    maxLength:[500, "Description can't exceed 500 characters"],
  },
  status:{
    type:String,
    required:[true, "task status is required"],
    enum:["todo", "inProgress", "completed"],
    default:"todo",
  },
  priority:{
    type:String,
    required:[true, "task status is required"],
    enum:["low", "normal", "high"],
    default:"normal",
  },
  dueDate:{
    type:Date,
    required:[true,"dueDate is required"]
  },
},
{ timestamps:true }
);


const Task = model("Task", taskSchema);

module.exports = Task;