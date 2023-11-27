
const bcrypt = require("bcryptjs")
const httpStatus = require("../utilts/httpStatus")
const User = require("../models/user_model")
const asyncWrapper = require("../middleware/asycnWrapper")
const appError = require("../utilts/appError")
const jwt = require("jsonwebtoken")
const generateJWT = require("../utilts/generateJWT")


const getAllUsers =asyncWrapper(async(req,res)=>{
    //console.log(req.headers)
    const query = req.query
    const limit = query.limit || 10 
    const page = query.page || 1
    const skip = (page-1)*limit
    const users = await User.find({},{"__v":false , password:false}).limit(limit).skip(skip)
    res.json({status:httpStatus.SUCCESS , data :{users}})
})

const register =asyncWrapper(async(req,res,next)=>{
    //console.log(req.body)
    const {first_name , last_name , email , password , role} = req.body
    const oldUser = await User.findOne({email:email})

    if(oldUser){
        const error = new appError('user alredy exist',400 ,httpStatus.FAIL)
        return next(error)}


    const hashPassword =await bcrypt.hash(password,10)

    const newUser = new User ({
        first_name,
        last_name,
        email,
        password :hashPassword,
        role,
        avatar :req.file.filename
    })

    //generate jwt token
    const token = await generateJWT({email:newUser.email , id:newUser._id , role: newUser.role})
    newUser.token = token

    await newUser.save()
    res.status(201).json({status :httpStatus.SUCCESS,data: {User:newUser}})

}
)
const login =asyncWrapper(async(req , res , next)=>{
    const {email , password} = req.body
    if (!email && !password){
        const error = new appError("email and password required" , 400 ,httpStatus.FAIL)
        return next(error)
    }
    const user = await User.findOne({email:email})
    const matachedPassword = await bcrypt.compare(password,user.password)


    if (user && matachedPassword){
        const token = await generateJWT({email:user.email , id:user._id , role:user.role})

        return res.status(201).json({status :httpStatus.SUCCESS,data: {token}})

    }
    else{
        const error = new appError("email or password not correct" , 500 ,httpStatus.ERROR)
        return next(error)
    }

})

module.exports ={
    getAllUsers,
    register,
    login
}