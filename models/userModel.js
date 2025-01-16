const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required:true,
      trim:true
    },
    email:{
      type:String,
      required:true,
      unique:true
    },
    mobile:{
      type:Number,
      required:false
    },
    address: {
      type:String,
      required:false
    },   
    password:{
      type:String,
      required:true
    },
    profiePic:{
      type:String,
      default: "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
    },
 },
 {timestamps:true}
)

module.exports = mongoose.model('USER', userSchema)