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
      args: [user_ID] 
      }; 
      PythonShell.run('/Sales_Forecasting.py', options, (err, data)=>{ 
        if(err) throw err; 
        if (err)
          {
            res.send({data3:err})
          }  
          if(data){
            res.send({data1:data[0],data2:data[1],data3:data[2],data4:data[4],data5:data[3],file:`http://localhost:5000/excel_files/${user_ID}/trend_all.csv`})
            console.log(data[0].toString())
          }
      }); 
    }
  })
})
  
app.get('/plot-graph', function(req, res) {
  var token=req.headers.token
  var decoded=jwt.verify(token, 'jwtPrivateKey')
  UserRegistrationModel.findOne({_id:decoded._id})
  .then(dat=>{
  if(dat)
  {
  console.log(dat._id)
  const w=xlsx.readFile(`./excel_files/${dat._id}/trend_5.csv`)
  const s=w.SheetNames;
  let data=xlsx.utils.sheet_to_json(w.Sheets[s[0]])
  const chartData={
      labels:[],
      datasets:[]
  }
  data.map(n=>{
      chartData.labels.push(n.description)
      chartData.datasets.push(n.quantity)
  })
  res.send({
      val:chartData
  });
}
})
});

app.get('/plot-graph_trend_by_sale', function(req, res) {
  var token=req.headers.token
  var decoded=jwt.verify(token, 'jwtPrivateKey')
  UserRegistrationModel.findOne({_id:decoded._id})
  .then(dat=>{
  if(dat)
  {
  console.log(dat._id)
  const w=xlsx.readFile(`./excel_files/${dat._id}/trend_by_sales_5.csv`)
  const s=w.SheetNames;
  let data=xlsx.utils.sheet_to_json(w.Sheets[s[0]])
  const chartData={
      labels:[],
      datasets:[]
  }
  data.map(n=>{
      chartData.labels.push(n.description)
      chartData.datasets.push(n.total_price)
  })
  res.send({
      val:chartData
  });
}
})
});


app.get('/all_products', (req, res)=> { 
  csvData=[]
  var token=req.headers.token
  var decoded=jwt.verify(token, 'jwtPrivateKey')
  UserRegistrationModel.findOne({_id:decoded._id})
  .then(data=>{
  if(data)
   {
  fs.createReadStream(`./excel_files/${data._id}/trend_all.csv`)
  .pipe(
      parse({
          delimiter:','
      })
  )
  .on('data',function(dataRow){
      csvData.push(dataRow)
  })
  .on('end',function(){
      res.status(200).json({data:csvData,file:`http://localhost:5000/excel_files/${data._id}/trend_all.csv`})
  })
}
})
})

app.get('/future_sales_data', (req, res)=> { 
  csvData=[]
  var token=req.headers.token
  var decoded=jwt.verify(token, 'jwtPrivateKey')
  UserRegistrationModel.findOne({_id:decoded._id})
  .then(data=>{
  if(data)
   {
  fs.createReadStream(`./excel_files/${data._id}/Next_30Days_Forecasting.csv`)
  .pipe(
      parse({
          delimiter:','
      })
  )
  .on('data',function(dataRow){
      csvData.push(dataRow)
  })
  .on('end',function(){
      res.status(200).json({data:csvData,file:`http://localhost:5000/excel_files/${data._id}/Next_30Days_Forecasting.csv`})
  })
}
})
})


app.get('/sales_forecasting_plot_graph', function(req, res) {
  var token=req.headers.token
  var decoded=jwt.verify(token, 'jwtPrivateKey')
  UserRegistrationModel.findOne({_id:decoded._id})
  .then(dat=>{
  if(dat)
   { 
  const w=xlsx.readFile(`./excel_files/${dat._id}/ARIMA.xlsx`)
  const s=w.SheetNames;
  let data=xlsx.utils.sheet_to_json(w.Sheets[s[0]])
  const chartData={
      labels:[],
      datasets:[]
  }
  data.map(n=>{
      chartData.labels.push(n.invoicedate)
      chartData.datasets.push(n.unitprice)
  })
  res.send({
      val:chartData
  })
}
  })
});

app.get('/future_sales_forecasting_plot_graph', function(req, res) {
  var token=req.headers.token
  var decoded=jwt.verify(token, 'jwtPrivateKey')
  UserRegistrationModel.findOne({_id:decoded._id})
  .then(dat=>{
  if(dat)
   { 
  const w=xlsx.readFile(`./excel_files/${dat._id}/Next_30Days_Forecasting.xlsx`)
  const s=w.SheetNames;
  let data=xlsx.utils.sheet_to_json(w.Sheets[s[0]])
  const chartData={
      labels:[],
      datasets:[]
  }
  data.map(n=>{
      chartData.labels.push(n.date)
      chartData.datasets.push(n.predicted_sales)
  })
  res.send({
      val:chartData
  })
}
  })
});

app.get('/all_products_by_sales_price', (req, res)=> { 
  csvData=[]
  var token=req.headers.token
  var decoded=jwt.verify(token, 'jwtPrivateKey')
  UserRegistrationModel.findOne({_id:decoded._id})
  .then(data=>{
  if(data)
   {
  fs.createReadStream(`./excel_files/${data._id}/trend_by_sales_all.csv`)
  .pipe(
      parse({
          delimiter:','
      })
  )
  .on('data',function(dataRow){
      csvData.push(dataRow)
  })
  .on('end',function(){
      res.status(200).json({data:csvData,file:`http://localhost:5000/excel_files/${data._id}/trend_by_sales_all.csv`})
  })
}
})
})



module.exports=app