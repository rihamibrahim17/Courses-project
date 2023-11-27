const mongoose = require("mongoose")
const validator = require("validator")
const userRole = require("../utilts/userRole")
const userSchema = new mongoose.Schema({
    first_name :{
        type: String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email :{
        type : String ,
        required:true ,
        unique : true,
        validate :[validator.isEmail , "filed must be a vaild email address"]


    },
    password :{
        type: String,
        required:true

    },
    token:{
        type:String
    },
    role :{
        type : String ,
        enum :[  userRole.USER  , userRole.ADMIN, userRole.MANAGER],
        default : userRole.USER

    },
    avatar :{
        type: String,
        default: "uploads/profile.png"
    }
})
module.exports =mongoose.model("User", userSchema)