// class appError extends Error {
//     constructor(){
//         super()
//     }
//     create(message ,statusCode , statusText){
//         this.message = message
//         this.message = statusCode
//         this.message = statusText
//         return this
//     }
// }
// module.exports = new appError()

class AppError extends Error {
    constructor(message, statusCode, statusText) {
        super(message);
        this.statusCode = statusCode;
        this.statusText = statusText;
    }
}

module.exports = AppError;