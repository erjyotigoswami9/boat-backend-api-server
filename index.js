const express = require("express") 
const dotenv = require("dotenv").config()
const cors = require("cors") ;

const PORT = process.env.PORT ;
const connection = require('./config/db') ;
const productRouter = require("./routes/productRoute") ;
const userRouter = require('./routes/userRoute') ;
const cartRouter = require('./routes/cartRoute') ;
const reviewRouter = require('./routes/reviewRoute') ;

const server = express()

server.use(express.json()) ;
server.use(cors()) ;

server.use('/products',productRouter) ;
server.use('/users',userRouter) ;
server.use('/cart', cartRouter) ;
server.use('/reviews',reviewRouter) ;


server.get('/',(req,res)=>{
    try {
        res.status(200).send("Health checkup is fine") ;
    } catch (error) {
        console.log(error)
    }
})

server.listen(PORT, async()=>{
    try {
        await connection
        console.log("server is running at port",PORT,"db is connected") ;
    } catch (error) {
        console.log(error)
    }
})