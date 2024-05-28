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
      PythonShell.run('RFM_Value.py', options, (err, data)=>{ 
          if (err)
          {
            res.send({data:'Some Errors in Running this Prediction, Try Again!'})
            console.log(err)
          }  
          if(data){
            res.send({data:data[0],file:`http://localhost:5000/excel_files/${user_ID}/custSeg.csv`})
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
  .then(data=>{
  if(data)
  {
  const userId=data._id
  const w=xlsx.readFile(`./excel_files/${userId}/custSeg.csv`)
  const s=w.SheetNames;
  let data1=xlsx.utils.sheet_to_json(w.Sheets[s[0]]);
  const chartData= {
      datasets: [{
          label: 'Revenue vs Recency',
          data: []
      }]
  }
  let fill=[];
  let point=[]
  data1.map(n=>{
      fill.push({x:n.Recency,y:n.Revenue})
      if(n.Segment=="Low-Value"){
         point.push("rgb(0,0,255)")
      }
      if(n.Segment=="Mid-Value"){
          point.push("rgb(0,128,0)")
       }
       if(n.Segment=="High-Value"){
          point.push("rgb(255,0,0)")
       }      
  })
  chartData.datasets[0].data=fill
  const chartData2= {
      datasets: [{
          label: 'Frequency vs Revenue',
          data: []
      }]
  }
  let fill2=[];
  let point2=[]
  data1.map(n=>{
      fill2.push({x:n.Revenue,y:n.Frequency})
      if(n.Segment=="Low-Value"){
         point2.push("rgb(0,0,255)")
      }
      if(n.Segment=="Mid-Value"){
          point2.push("rgb(0,128,0)")
       }
       if(n.Segment=="High-Value"){
          point2.push("rgb(255,0,0)")
       }
  })
  chartData2.datasets[0].data=fill2
  const chartData3= {
      datasets: [{
          label: 'Frequency vs Recency',
          data: []
      }]
  }
  let fill3=[];
  let point3=[]
  data1.map(n=>{
      fill3.push({x:n.Recency,y:n.Frequency})
      if(n.Segment=="Low-Value"){
          point3.push("rgb(0,0,255)")
      }
      if(n.Segment=="Mid-Value"){
          point3.push("rgb(0,128,0)")
          }
          if(n.Segment=="High-Value"){
          point3.push("rgb(255,0,0)")
          }  
  })
  chartData3.datasets[0].data=fill3
  res.send({
      val:chartData,
      pointcolor:point,
      val2:chartData2,
      pointcolor2:point2,
      val3:chartData3,
      pointcolor3:point3,
  })
}
})})


app.get('/show_data', (req, res)=> { 
    csvData=[]
    var token=req.headers.token
    var decoded=jwt.verify(token, 'jwtPrivateKey')
    UserRegistrationModel.findOne({_id:decoded._id})
    .then(data=>{
    if(data)
     {
    fs.createReadStream(`./excel_files/${data._id}/custSeg.csv`)
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
        res.status(200).json({data:csvData,file:`http://localhost:5000/excel_files/${data._id}/custSeg.csv`})
    })
  }
  })
  })

  

module.exports=app