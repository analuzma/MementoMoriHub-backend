const User = require("../models/User.model");
const mongoose = require("mongoose")

//Admin reads all Users
exports.readAllUsers = (req,res,next) =>{

    User.find( { role: { $ne:"Admin"} }, {password:0, __v:0, createdAt:0, updatedAt:0} )
    .then(users=>{
        res.status(200).json({ users })
    })
    .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).json({
            errorMessage: "Something happened.",
          });
        }
        return res.status(500).json({ errorMessage: error.message });
      });
}