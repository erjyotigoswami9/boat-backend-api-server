const jwt = require("jsonwebtoken") ;
const dotenv = require("dotenv").config() ;

const userModel = require('../model/userModel') ;
const blacklistedArr = require("../blacklist/blacklist") ;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ;

const auth = async(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1] ;
        // console.log(blacklistedArr) ;
        if(blacklistedArr.includes(token)){
            res.status(200).send({message : "pls login !"}) ;
        }else{
            jwt.verify(token, JWT_SECRET_KEY, async(err,decoded)=>{
                if(err){
                    console.log(err) ;
                    res.status(404).send({err:"error occurred !"})
                }else{
                    // console.log(decoded) ;
                    let data = await userModel.findOne({email:decoded.email}) ;
                    if(data!=null){
                        req.user = {email:data.email, phone: data.email, name: data.name, _id: data._id, role: data.role} ;
                        next() ;
                    }
                    else{
                        res.status(200).send({message : "user not found"}) ;
                    }
                }
            })
        }
    } catch (error) {
        console.log(error) ;
        res.status(404).send({err:"error occurred !"})
    }
}

module.exports = auth ;