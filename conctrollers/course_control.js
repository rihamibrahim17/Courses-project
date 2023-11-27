let {courses} = require("../Data/courses")
const Course = require("../models/course_model")
const httpStatus = require("../utilts/httpStatus")
const asyncWrapper = require("../middleware/asycnWrapper")
const appError = require("../utilts/appError")



const getAllCourses = asyncWrapper(
    async (req,res)=>{
        const query = req.query
        const limit = query.limit || 2
        const page = query.page ||1
        const skip = (page-1)*limit
        const courses = await Course.find({},{"__v":false}).limit(limit).skip(skip)
        res.json({status :"success",data: {courses:courses}})

})

const getCourse = asyncWrapper(async (req,res,next)=>{
        const course = await Course.findById(req.params.courseid)
        if(!course){
            const error = new appError('not found course',400 ,httpStatus.FAIL)
            return next(error)
           // return res.status(404).json({status:httpStatus.FAIL , data : {course :null}}) //for id but with num incorrect
    }
        return res.json({status :httpStatus.SUCCESS,data: {course:course}})
}  
) 



const creatNewCourse =asyncWrapper(async (req,res)=>{
    console.log(req.body)
    const newCourse = new Course(req.body)
    await newCourse.save()

    res.status(201).json({status :httpStatus.SUCCESS,data: {course:newCourse}})
}
)
const deleteCourse = asyncWrapper(async (req,res)=>{
    const data = await Course.findOneAndDelete(req.params.id)
   
    res.json({status:"success" , data :{data}})

})

const updateCourse = asyncWrapper(async(req,res)=>{
    const courseId = req.params.id
    const updatedCourse = await Course.findByIdAndUpdate(courseId ,{$set: {...req.body}})
    res.status(200).json(updatedCourse)
})

module.exports={
    getAllCourses,
    getCourse,
    creatNewCourse,
    deleteCourse,
    updateCourse
}