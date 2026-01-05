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
  user: {
    type: Schema.Types.ObjectId,
    ref:"User",
    required: true,
  }
},
{ timestamps:true }
);


const Task = model("Task", taskSchema);

module.exports = Task;

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *    Task:
 *      type: object
 *      required:
 *        - title
 *        - description
 *        - status
 *        - priority
 *        - dueDate
 *      properties:
 *        title:
 *          type: string
 *          description: The title of the task
 *          maxLength: 100
 *        description:
 *          type: string
 *          description: the description of the task
 *          maxLength: 500
 *        status:
 *          type: string
 *          description: The status of the task
 *          enum: ["todo", "inProgress", "completed"]
 *        priority:
 *          type: string
 *          description: The priority of the task
 *          enum: ["low", "normal", "high"]
 *        dueDate:
 *          type: string
 *          format: ISO8601 Date String
 *          description: The due date of the task
 *      example:
 *          title: exercise
 *          description: weight loss excercise
 *          status: todo
 *          priority: normal
 *          dueDate: 2025-01-01T12:00:00Z
 */