
const roleCheck = (req,res,next)=>{
    try {
        if(req.user.role=="admin"){
            next() ;
        }else{
            res.status(200).send({message: "only admin can access"}) ;
        }
    } catch (error) {
        console.log(error) ;
        res.status(404).send({message : "error occurred !"}) ;
    }
}

module.exports = roleCheck ;