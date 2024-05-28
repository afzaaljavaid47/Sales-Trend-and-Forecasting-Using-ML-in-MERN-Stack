const mongoose=require('mongoose')
var Action_Schema=new mongoose.Schema({
    aname:{
        type:String,
        require:true
    },
    aplan:{
        type:String,
        require:true
    }
})
var Action_Model=mongoose.model('Actions',Action_Schema)
module.exports=Action_Model