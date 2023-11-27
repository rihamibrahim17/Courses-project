const express = require("express")
const usersController = require("../conctrollers/user_control")
const verifyToken = require("../middleware/verifyToken")
const router = express.Router()
const multer = require("multer")
const AppError = require("../utilts/appError")
const diskStorage = multer.diskStorage({
    destination: function(req,file , cb){
        console.log(file)
        cb(null,'uploads')
    },
    filename: function(req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `user-${Date.now()}.${ext}`;
        cb(null, fileName);
    }
})

const fileFilter = (req, file, cb) => {
    const imageType = file.mimetype.split('/')[0];
    
    if(imageType === 'image') {
        return cb(null, true)
    } else {
        return cb(new AppError('file must be an image', 400), false)
    }
}

const upload = multer({storage:diskStorage ,fileFilter})
router.route ("/").get(verifyToken,usersController.getAllUsers)

router.route("/register").post(upload.single('avatar'),usersController.register)
router.route("/login").post(usersController.login)


module.exports = router