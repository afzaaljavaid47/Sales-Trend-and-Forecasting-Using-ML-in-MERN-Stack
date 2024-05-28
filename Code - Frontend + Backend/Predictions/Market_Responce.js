const express=require('express')
const app=express()
const {PythonShell} =require('python-shell');
var jwt=require('jsonwebtoken')
var UserRegistrationModel=require('../models/UserRegistration')
var fs=require('fs')
var parse=require('csv-parse')

app.get('/',(req,res)=>{
    var token=req.headers.token
    var decoded=jwt.verify(token, 'jwtPrivateKey')
    UserRegistrationModel.findOne({_id:decoded._id})
    .then(data=>{
    if(data)
     {
      var user_ID=data._id
      let options = { 
      mode: 'text', 
      pythonOptions: ['-u'], 
      scriptPath: 'python_scripts',
      args: [user_ID] // sys.argv[1] 
      }; 
      PythonShell.run('Market.py', options, (err, data)=>{ 
          if (err)
          {
            res.send({data:'Some Errors in Running this Prediction, Try Again'})
            console.log(err)
          }  
          if(data){
            res.send({err:data[0],data1:data[1],data2:data[2],data3:data[3],data4:data[4],data5:data[5],data6:data[6],data7:data[7],data8:data[8]})
          }
      }); 
    }
  })
})

module.exports=app