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
      // pythonPath:'F:\\Anaconda_Installation\\python.exe',
      // pythonPath:'c:\\users\\haier\\appdata\\local\\programs\\python\\python38\\python.exe',
      pythonOptions: ['-u'], 
      scriptPath: 'python_scripts',
      args: [user_ID] // sys.argv[1] 
      }; 
      PythonShell.run('Apriori.py', options, (err, data)=>{ 
          if (err)
          {
            res.send({data:'Some Errors in Running this Prediction, Try Again'})
            console.log(err)
          }  
          if(data){
            res.send({data:data[0],file:`http://localhost:5000/excel_files/${user_ID}/Market_Basket.csv`})
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
  fs.createReadStream(`./excel_files/${data._id}/Market_Basket.csv`)
  .pipe(
      parse({
          delimiter:','
      })
  )
  .on('data',function(dataRow){
      csvData.push(dataRow)
  })
  .on('end',function(){
      console.log(csvData)
      res.status(200).json({data:csvData})
  })
}
})
})


module.exports=app