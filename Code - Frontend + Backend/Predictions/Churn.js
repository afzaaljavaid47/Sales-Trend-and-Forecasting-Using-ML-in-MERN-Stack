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
      PythonShell.run('Churn.py', options, (err, data)=>{ 
          if (err)
          {
            res.send({data:'Some Errors in Running this Prediction, Try Again'})
            console.log(err)
          }  
          if(data){
            res.send({err:data[0],err1:data[1],err2:data[2],err3:data[3],err4:data[4],err5:data[5],err6:data[6],err7:data[7],err8:data[8],mat1:data[9],mat2:data[10],recall:data[11],accuracy:data[12],precision:data[13],fp:data[14],fs:data[15],file:`http://localhost:5000/excel_files/${user_ID}/churn.csv`})
            console.log(data.toString())
          }
      }); 
    }
  })
})
  
app.get('/preview_data', (req, res)=> { 
    csvData=[]
    var token=req.headers.token
    var decoded=jwt.verify(token, 'jwtPrivateKey')
    UserRegistrationModel.findOne({_id:decoded._id})
    .then(data=>{
    if(data)
     {
    fs.createReadStream(`./excel_files/${data._id}/churn.csv`)
    .pipe(
        parse({
            delimiter:','
        })
    )
    .on('data',function(dataRow){
        csvData.push(dataRow)
    })
    .on('end',function(){
        res.status(200).json({data:csvData})
    })
  }
  })
  })
  
module.exports=app