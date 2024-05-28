const express = require('express');
const app = express();
const port = process.env.PORT || 5000
const bodyParser = require('body-parser')
var cors = require('cors');
var path=require('path')
app.use(cors());
//serving static files

var sales_forecasting=require('./Predictions/Sales_Forecasting')
var market_basket=require('./Predictions/Market_Basket')
var rfm=require('./Predictions/RFM')
var ltv=require('./Predictions/LTV')
var Churn=require('./Predictions/Churn')
var Uplift=require('./Predictions/Uplift')
var Market_Responce=require('./Predictions/Market_Responce')
app.use(express.static('public'))
app.use('/public',express.static('public'))
app.use('/excel_files',express.static('excel_files'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname,'public'))) 
// parse application/json
app.use(bodyParser.json())

// import routes
require('./routes')(app);

app.use('/prediction/sales_forecasting',sales_forecasting)
app.use('/prediction/market_basket',market_basket)
app.use('/prediction/rfm',rfm)
app.use('/prediction/ltv',ltv)
app.use('/prediction/churn',Churn)
app.use('/prediction/uplift',Uplift)
app.use('/prediction/market_responce',Market_Responce)
app.set('view engine','ejs')

app.listen(port,()=>{
    console.log("server is running on port" + port)
})

