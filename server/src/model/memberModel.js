const mongoose = require("mongoose")

const memberSchema = new mongoose.Schema({

    firstName:{type:String,required:true,trim:true},
    lastName:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true},
    designation:{type:String}
})

module.exports = mongoose.model("member",memberSchema)