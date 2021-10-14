const mongoose = require("mongoose");
 const userSchema = new mongoose.Schema({
     name:{
         type:String
     },
     image:{
        type:String
    },
     lastname:{
         type:String
     }
 })

 const User = new mongoose.model("data",userSchema)

 module.exports = User;