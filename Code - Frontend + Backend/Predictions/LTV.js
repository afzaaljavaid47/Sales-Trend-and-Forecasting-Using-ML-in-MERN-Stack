const express=require('express')
const app=express()
const {PythonShell} =require('python-shell');
var jwt=require('jsonwebtoken')
var UserRegistrationModel=require('../models/UserRegistration')
const xlsx=require('xlsx')
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
      PythonShell.run('LTValue.py', options, (err, data)=>{ 
          if (err)
          {
            res.send({data:'Some Errors in Running this Prediction, Try Again!'})
            console.log(err)
          }  
          if(data){
            res.send({data:data[0],file:`http://localhost:5000/excel_files/${user_ID}/LTV.csv`})
            console.log(data.toString())
          }
      }); 
    }
  })
})
  
app.get('/plot-graph', (req, res)=> {
  var token=req.headers.token
  var decoded=jwt.verify(token, 'jwtPrivateKey')
  UserRegistrationModel.findOne({_id:decoded._id})
  .then(dataa=>{
  if(dataa)
   {
  const userId=dataa._id
  const w=xlsx.readFile(`./excel_files/${userId}/LTV.csv`)
  const s=w.SheetNames;
  let data1=xlsx.utils.sheet_to_json(w.Sheets[s[0]])
  const data=[0,0,0]
data1.map(n=>{
  if(n.Segment=="Low-Value"){
      data[0]++; 
  }
  if(n.Segment=="Mid-Value"){
      data[1]++;
  }
  if(n.Segment=="High-Value"){
      data[2]++;
  }
})
console.log(data)
res.send({
  val:data,
})
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
  fs.createReadStream(`./excel_files/${data._id}/LTV.csv`)
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