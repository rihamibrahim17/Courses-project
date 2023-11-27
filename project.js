const express = require("express")
const mongoose = require("mongoose")
const coursesRoute = require("./route/course-route")
const httpStatus = require("./utilts/httpStatus")
const cors = require("cors")
const userRoute = require("./route/user_route")
const path = require("path")
const app = express()
const appError = require("./utilts/appError")
port = 4001
require("dotenv").config()
const url = process.env.MONGO_URL
//console.log(process.env.MONGO_URL)
mongoose.connect(url).then(()=>{
    console.log("connected successfully")
})

app.use('/uploads',express.static(path.join(__dirname , 'uploads')))
app.use(cors())
app.use(express.json())
app.use("/api/courses" , coursesRoute)
app.use("/api/users" ,userRoute)

// const cry = require("crypto").randomBytes(32).toString("hex")
// console.log(cry)

app.use((error , req,res ,next)=>{
    res.status(error.statusCode || 500).json({status:error.statusText||httpStatus.ERROR , message:error.message,code :error.statusCode || 500 , data:null})
})

app.all("*" , (req,res,next)=>{
    res.status(404).json({status: httpStatus.ERROR , message :"this resource is not vaild"})
})


app.listen(port ,()=>{
    console.log("iam listening to port")
})