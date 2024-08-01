const express = require("express") ;
const auth = require('../middleware/authMiddleware') ;
const cartModel = require("../model/cartModel");

const cartRouter = express.Router() ;

cartRouter.get('/data', auth , async(req,res)=>{
    try {
        let data = await cartModel.find({userId : req.user._id}) ;
        res.status(200).send({data : data}) ;
    } catch (error) {
        console.log(error) ;
        res.status(404).send({err : "error occurred !"}) ;
    }
})

cartRouter.post('/create',auth, async(req,res)=>{
    try {
        let { productId, productName, productPrice, quantity, imgSrc} = req.body ;
        let data = await cartModel.findOne({userId:req.user._id, productId}) ;
        if(data!=null){
            res.status(200).send({message : "product already exists in the database"}) ;
        }else{
            let sendingData = new cartModel({productId, productName, productPrice, quantity, userId : req.user._id, userName : req.user.name, imgSrc}) ;
            await sendingData.save() ;
            res.status(200).send({message: "created"}) ;
        }
    } catch (error) {
        console.log(error) ;
        res.status(404).send({err : "error occurred !"}) ;
    }
})

cartRouter.delete('/deleteAll', auth, async(req,res)=>{
    try {
        let data = await cartModel.deleteMany({userId:req.user._id}) ;
        res.status(200).send({data}) ;
    } catch (error) {
        console.log(error) ;
        res.status(404).send({err : "error occurred !"}) ;
    }
})

cartRouter.patch('/update/:productId', auth, async(req,res)=>{
    try {
        let productId = req.params.productId ;
        let quantityChange = req.body ; // {quantity : 2}
        let data = await cartModel.findOne({ productId, userId: req.user._id}) ;
        // console.log(data) ;
        if(data!=null){
            // console.log(req.user._id, data.userId) ;
            if(req.user._id==data.userId){
                // console.log("quantity",quantityChange.quantity) ;
            if(quantityChange.quantity>0){
               let updatedData = await cartModel.findByIdAndUpdate({_id: data._id},{quantity:quantityChange.quantity}) ;
               res.status(200).send({message: "updated"}) ;
            }else {
                if(quantityChange.quantity<=0){
                let deletedData = await cartModel.findByIdAndDelete({_id: data._id}) ;
                res.status(200).send({message: "deleted"}) ;
                }
                else{
                    res.status(200).send({message: "spelling mistake"}) ;
                }
            }
            }else{
                res.status(200).send({message: "userId not matched"}) ;
            }
        }
        else{
            res.status(200).send({message : "product not found for this userId"}) ;
        }
    } catch (error) {
        console.log(error) ;
        res.status(404).send({err : "error occurred !"}) ;
    }
})

module.exports = cartRouter ;