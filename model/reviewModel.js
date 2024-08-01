const mongoose = require("mongoose") ;

const reviewSchema = mongoose.Schema({
    userName : {type : String, required : true},
    dateOfWriting : {type : String, required : true},
    userEmail : {type: String, required: true},
    reviewRating : {type: String, required : true},
    reviewTitle : {type: String, required : true},
    reviewBox : {type : String, required : true},
    userId : {type: String, required : true},
    productId : {type: String, required : true}
},{
    versionKey : false
})

const ReviewModel = mongoose.model('reviewsList',reviewSchema) ;

module.exports = ReviewModel ;