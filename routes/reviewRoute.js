const express = require("express") ;
const ReviewModel = require("../model/reviewModel");
const auth = require('../middleware/authMiddleware') ;

const reviewRouter = express.Router() ;

reviewRouter.get('/all/:productId', async(req,res)=>{
    try {
        let productId = req.params.productId ;
        let pageNo = req.query.page  ;
        let limitNo = req.query.limit ;
        if(pageNo<=0){
            pageNo=1
        }
        if(limitNo<=0){
            limitNo=6
        }
        let data = await ReviewModel.find({productId}).skip((pageNo-1)*limitNo).limit(limitNo) ;
        res.status(200).send({data}) ;
    } catch (error) {
        console.log(error) ;
        res.status(404).send({err:"error occurred !"}) ;
    }
})

reviewRouter.post('/create', auth , async(req,res)=>{
    try {
        let {productId , userName, userEmail, reviewRating, reviewTitle, reviewBox, dateOfWriting } = req.body ;
        userId = req.user._id ;
        let d = new Date() ;
        console.log("date " , d) ;
        let nd1 = String(d) ;
        nd1 = nd1.split(" ")[1]+"-"+nd1.split(" ")[2]+"-"+nd1.split(" ")[3] ;
        console.log(nd1) ;
        let checkData = await ReviewModel.findOne({userId,productId}) ;
        if(checkData!=null){
            let updateData = await ReviewModel.findByIdAndUpdate({_id:checkData._id},{userId, productId, userName, userEmail, reviewBox, reviewRating, reviewTitle, dateOfWriting:nd1});
            res.status(200).send({message: "updated"}) ;
        }
        else{
            let sendingData = new ReviewModel({userId, productId, userName, userEmail, reviewBox, reviewRating, reviewTitle, dateOfWriting:nd1}) ;
            await sendingData.save() ;
            res.status(200).send({message : "posted"}) ;
        }
    } catch (error) {
        console.log(error) ;
        res.status(404).send({err:"error occurred !"}) ;
    }
})

reviewRouter.delete('/delete/:productId',auth, async(req,res)=>{
    try {
        let productId = req.params.productId ;
        let userId = req.user._id ;
        let checkData = await ReviewModel.findOne({userId, productId}) ;
        if(checkData!=null){
            let deletedData = await ReviewModel.findByIdAndDelete({_id:checkData._id}) ;
            res.status(200).send({message : "deleted"}) ;
        }
        else{
            res.status(200).send({message : "product not found in database for this user"}) ;
        }
    } catch (error) {
        console.log(error) ;
        res.status(404).send({err:"error occurred !"}) ;
    }
})

module.exports = reviewRouter ;