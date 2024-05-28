const mongoose=require('mongoose')
var AdminSchema=new mongoose.Schema({
    uname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
    ,
    password:{
        type:String,
        required:true
    }
})
var AdminModel=mongoose.model('admin',AdminSchema)
module.exports=AdminModel