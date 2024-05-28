const mongoose=require('mongoose')
var Plan_Schema=new mongoose.Schema({
    pname:{
        type:String,
        require:true
    },
    pprice:{
        type:String,
        require:true
    }
})
var Plan_Model=mongoose.model('Plan',Plan_Schema)
module.exports=Plan_Model