const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstName:{
    type:String,
    required:[true,"first name is required"],
    trim:true,
    maxLength:[100, "first name can't exceed 100 characters"],
  },
  lastName:{
    type:String,
    required:false,
    trim:true,
    maxLength:[100,"last name can't exceed 100 characters"],
  },
  email:{
    type:String,
    required:[true, "email is required"],
    
  },
  password:{
    type:String,
    required:[true,"Password is required"],
  }
});


const User = model('User',userSchema);

module.exports = User;