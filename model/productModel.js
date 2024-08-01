const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name : {type: String, required : true},
    price : {type: Number, required : true},
    strikeOffPrice : {type: Number, required : true},
    description : {type: String, required : true},
    offerRate : {type: Number, required : true},
    imgSrc : {type: Object, required: true},
    category : {type : String, required: true},
    oneLargeImageSrc : {type : String, required: true},
    userId : {type : String, required : true },
    username : {type: String, required: true}
},{
    versionKey : false 
})

const productModel = mongoose.model("productListItems",productSchema) ;

module.exports = productModel ;