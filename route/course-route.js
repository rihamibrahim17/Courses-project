const express = require("express")
const router = express.Router()
const controller = require("../conctrollers/course_control")
const verifyToken = require("../middleware/verifyToken")
const userRole = require("../utilts/userRole")
const allowedTo = require("../middleware/allowedTo")
//ge all courses
router.route("/").get(verifyToken, controller.getAllCourses)
.post(verifyToken, controller.creatNewCourse)

//get course
router.get("/:courseid",controller.getCourse)



//update course
router.route("/:id").patch(controller.updateCourse)
.delete(verifyToken,allowedTo(userRole.ADMIN , userRole.MANAGER), controller.deleteCourse)

module.exports = router
