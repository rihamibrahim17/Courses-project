const jwt = require("jsonwebtoken")
const httpStatus = require("../utilts/httpStatus")
const appError = require("../utilts/appError")
const verifyToken = async(req,res,next)=>{
    const authHeader = req.headers['Authorization'] || req.headers['authorization']

    if(!authHeader) {
        const error = new appError('token is required',401 ,httpStatus.ERROR)
        return next(error)
    }

    const token = authHeader.split(' ')[1]
    try{
    const currentUser= jwt.verify(token , process.env.JWT_SECRET_KEY)
    req.currentUser = currentUser
    next()
    }
    
    catch(err){
        const error = new appError('Invalid Token',401 ,httpStatus.ERROR)
        return next(error)
    }
    
}
 module.exports = verifyToken