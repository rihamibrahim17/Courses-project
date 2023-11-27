const httpStatus = require("../utilts/httpStatus")
const appError = require("../utilts/appError")
module.exports = (...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.currentUser.role)){
            return next(new appError('this role is not authorized', 401))
        }
        next()
    }

}