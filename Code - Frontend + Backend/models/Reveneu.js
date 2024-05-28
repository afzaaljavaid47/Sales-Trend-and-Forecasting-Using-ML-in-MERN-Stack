const mongoose=require('mongoose')
var Reveneu_Schame=new mongoose.Schema({
    user_id:{
        type:String,
        require:true
    },
    card_number:{
        type:Number,
        require:true
    },
    expiry_date:{
        type:String,
        require:true
    },
    cvv:{
        type:Number,
        require:true
    },
    amount:{
        type:Number,
        require:true
    },
    upgraded_package_name:{
        type:String,
        require:true
    }
})
var Reveneu_Model=mongoose.model('reveneu',Reveneu_Schame)
module.exports=Reveneu_Model