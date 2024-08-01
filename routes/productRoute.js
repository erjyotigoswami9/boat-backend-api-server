const express = require("express") ;
const productModel = require("../model/productModel") ;
const auth = require('../middleware/authMiddleware') ;

const productRouter = express.Router() ;

productRouter.get('/all', async (req,res)=>{
    try {
        let {pageNo, limitNo} = req.query ;
        // console.log(pageNo,limitNo) ;
        if(pageNo<=0){
            pageNo = 1 ;
        }
        if(limitNo<=0){
            limitNo = 5 ;
        }
        let data = await productModel.find().skip((pageNo-1)*limitNo).limit(limitNo) ;
        res.status(200).send({data:data});
    } catch (error) {
        console.log(error) ;
        res.status(404).send({err:"error occurred !"}) ;
    }
})

productRouter.get('/full', async (req,res)=>{
    try {
       
        let data = await productModel.find() ;
        res.status(200).send({data:data});
    } catch (error) {
        console.log(error) ;
        res.status(404).send({err:"error occurred !"}) ;
    }
})


productRouter.get('/category/:categoryName', async(req,res)=>{
    try {
        let categoryName = req.params.categoryName ;
        let data = await productModel.find({category: categoryName}) ;
        res.status(200).send({data:data}) ;
    } catch (error) {
        console.log(error) ;
        res.status(404).send({err:"error occurred !"}) ;
    }
})

productRouter.get('/data', auth ,async(req,res)=>{
    try {
        
        let checkData = await productModel.find({userId:req.user._id}) ;
        console.log(checkData) ;
        if(checkData.length>0){
            res.status(200).send({data:checkData}) ;
        }
        else{
            res.status(200).send({message : "user not found !"}) ;
        }
    } catch (error) {
        console.log(error) ;
        res.status(404).send({err:"error occurred !"})
    }
})

productRouter.post('/create', auth ,async(req,res)=>{
    try {
        let data = req.body ;
        console.log(data) ;
        let sendingData = new productModel({...data, userId: req.user._id, username : req.user.name}) ;
        await sendingData.save() ;
        res.status(200).send({message: "created"});
    } catch (error) {
        console.log(error) ;
        res.status(404).send({err:"error occurred !"}) ;
    }
})

productRouter.patch('/update/:id', auth ,async(req,res)=>{
    try {
        let data = req.body ;
        let productId = req.params.id ;
        let checkData = await productModel.findOne({_id : productId}) ;
        if(checkData!=null){
            if(req.user._id==checkData.userId){
                let fixData = await productModel.findByIdAndUpdate({_id:productId},{...data}) ;
                res.status(200).send({message : "updated"}) ;
            }else{
                res.status(200).send({message: "userId not matched"}) ;
            }
        }
        else {
            res.status(200).send({message : "Data not found in the Database"}) ;
        }
    } catch (error) {
        console.log(error) ;
        res.status(404).send({err:"error occurred !"}) ;
    }
})

productRouter.delete('/delete/:id', auth , async(req,res)=>{
    try {
        let productId = req.params.id ;
        let isCheckData = await productModel.findOne({_id: productId}) ;
        if(isCheckData!=null){
            if(req.user._id==isCheckData.userId){
                let deletedData = await productModel.findByIdAndDelete({_id:productId}) ;
                res.status(200).send({message : "deleted"}) ;
            }else{
                res.status(200).send({message : "userId not matched"}) ;
            }
        }
        else{
            res.status(200).send({message : "Data not found in the Database"}) ;
        }
    } catch (error) {
        console.log(error) ;
        res.status(404).send({err:"error occurred !"}) ;
    }
})

module.exports = productRouter