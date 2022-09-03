const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { clearRes } = require("../utils/utils");

exports.verifyToken = ( req,res,next ) =>{
    const { headload, signature } = req.cookies

    if( !headload || !signature ) return res.status(401).json({errorMessage:"Not allowed!"});

    jwt.verify(`${headload}.${signature}`,process.env.SECRET, (error,decoded)=>{
        if(error){
            return res.status(401).json({errorMessage:"Not allowed!"});
        }

        User.findById(decoded.userId)
        .then(user=>{
            req.user = clearRes(user.toObject())
            next()
        })
        .catch(error=>{
            res.status(401).json({errorMessage:"Not found."});
        })
    })
}

exports.checkRole = ( arrayRoles ) => {

    return (req,res,next)=>{
        const {role} = req.user

        if(arrayRoles.includes(role)){
            next()
        }else{
            res.status(401).json({errorMessage:"Not allowed!"});
        }
    }
}