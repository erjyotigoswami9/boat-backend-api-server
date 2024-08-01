const mongoose = require("mongoose") ;

const userSchema = mongoose.Schema({
    email : {type : String, required : true},
    password : {type : String, required : true} ,
    phone : {type : Number, required: true},
    name : {type: String, required : true},
    role : {type: String, required: true}    // admin or customer
},{
    versionKey : false
})

const userModel = mongoose.model('userListsDetails',userSchema) ;

module.exports = userModel ;