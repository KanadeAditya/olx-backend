const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticator = (req,res,next) =>{
    let token = req.headers.authorization ; 

    if(token){
        jwt.verify(token, process.env.secret, (err,decoded)=>{
            if(err){
                console.log(err)
                res.status(401).send({msg:err})
            }else{
                req.body.userID = decoded.userID
                req.body.email = decoded.email
                next()
            }
        })
    }else{
        res.status(401).send({msg:"Please Login Again , Access Denied"})
    }
}