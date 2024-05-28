import React, { Component } from 'react';
import styles from '../../../css/uploaddata.module.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import Menubar from '../Menubar'
import Footer from '../Footer'
import Setting_Menu from '../Setting_Menu'
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'
import buffering from '../../../images/buffering.gif';
import {Line} from 'react-chartjs-2'
import Skeleton from 'react-loading-skeleton';

class Sales_Forecasting extends Component {
  constructor(props){
    super(props)
    this.state = {
        uploaded: 0,
        buffering: false,
        file:null,
        error:'',
        warnings:null,
        is_sales_forecasting_run:false,
        is_future_sales_forecasting_run:false,
        all_trending_products_file:null,
        all_trending_products_by_sales_file:null,
        result:'',
        checked:false,
        forecast_checked:false,
        all_trending_products:null,
        all_trending_products_by_sales:null,
        future_sales:null,
        future_sales_file:null,
        chartsData:{ 
          labels:[],
            datasets:[
                {
                  label:'Sales Price',
                  data:[],
                  fill: false,
                  borderColor: '#2196f3', // Add custom color border (Line)
                  backgroundColor: '#2196f3', //
                  pointHoverBackgroundColor: '#fffff',
                }
            ]
        },
        forecastData:{ 
          labels:[],
            datasets:[
                {
                  label:'Forecast Price',
                  data:[],
                  fill: false,
                  borderColor: '#2196f3', // Add custom color border (Line)
                  backgroundColor: 'rgba(184, 31, 46)', //
                  pointHoverBackgroundColor: '#fffff',
                }
            ]
        },
        chartData:{ 
          labels:[],
            datasets:[
                {
                  label:'Sales Quantity',
                  data:[],
                  fill: true,
                  backgroundColor: "rgba(75,192,192,0.2)",
                  borderColor: "rgba(222, 20, 192)",
                  pointHoverBackgroundColor: '#fffff',
                }
            ]
        },
        trend_by_sales:{ 
          labels:[],
            datasets:[
                {
                  label:'Sales Price',
                  data:[],
                  fill: true,
                  backgroundColor: "rgba(75,192,192,0.2)",
                  borderColor: "green",
                  pointHoverBackgroundColor: '#fffff',
                }
            ]
        },
    }
}

handleCheckboxChange = event =>
    this.setState({ checked: event.target.checked })
forecast_handleCheckboxChange = event =>
    this.setState({ forecast_checked: event.target.checked })

get_all_forecast_sales_price(){
      axios.get('/prediction/sales_forecasting/future_sales_data',{headers: {token: Cookies.get('token')}})
      .then(response => {
         this.setState({future_sales:response.data.data,future_sales_file:response.data.file})
        });
    }

future_sales_forecasting_plot_graph() {
      axios.get('/prediction/sales_forecasting/future_sales_forecasting_plot_graph',{headers: {token: Cookies.get('token')}})
          .then(response => {
              this.state.forecastData.labels=response.data.val.labels;
              let fill=response.data.val.datasets;
              const d=[]
              fill.map(n=>{
                  d.push(n)
              })
              var forecastData = {...this.state.forecastData}
              forecastData.datasets[0].data = d;
              this.setState({
                forecastData,
                  is_future_sales_forecasting_run:true
              }) 
              this.get_all_forecast_sales_price();
              });
  }


sales_forecasting_plot_graph() {
        axios.get('/prediction/sales_forecasting/sales_forecasting_plot_graph',{headers: {token: Cookies.get('token')}})
            .then(response => {
                this.state.chartsData.labels=response.data.val.labels;
                let fill=response.data.val.datasets;
                const d=[]
                fill.map(n=>{
                    d.push(n)
                })
                var chartsData = {...this.state.chartsData}
                chartsData.datasets[0].data = d;
                this.setState({
                    chartsData,
                    is_sales_forecasting_run:true
                }) 
              this.future_sales_forecasting_plot_graph()  
              });
    }

get_all_trending_products_by_sales_price(){
      axios.get('/prediction/sales_forecasting/all_products_by_sales_price',{headers: {token: Cookies.get('token')}})
      .then(response => {
         this.setState({all_trending_products_by_sales:response.data.data,all_trending_products_by_sales_file:response.data.file})
         this.sales_forecasting_plot_graph();
        });
    }
    
get_trending_products_by_sales(){
  axios.get('/prediction/sales_forecasting/plot-graph_trend_by_sale',{headers: {token: Cookies.get('token')}})
  .then(response => {
  
    this.state.trend_by_sales.labels=response.data.val.labels;
    let fill=response.data.val.datasets;
    const d=[]
    fill.map(n=>{
        d.push(n)
    })
    console.log(d)
    console.log(this.state.trend_by_sales.labels)
    var chartsData = {...this.state.trend_by_sales}
    chartsData.datasets[0].data = d;
    this.setState({
      trend_by_sales:chartsData
    }) 
    this.get_all_trending_products_by_sales_price()

    });
}

get_all_trending_products(){
  axios.get('/prediction/sales_forecasting/all_products',{headers: {token: Cookies.get('token')}})
  .then(response => {
     this.setState({all_trending_products:response.data.data,all_trending_products_file:response.data.file})
     this.get_trending_products_by_sales()

    });
}

get_trending_products(){
  axios.get('/prediction/sales_forecasting/plot-graph',{headers: {token: Cookies.get('token')}})
  .then(response => {
    this.state.chartData.labels=response.data.val.labels;
    let fill=response.data.val.datasets;
    const d=[]
    fill.map(n=>{
        d.push(n)
    })
    console.log(d)
    console.log(this.state.chartData.labels)
    var chartData = {...this.state.chartData}
    chartData.datasets[0].data = d;
    this.setState({
        chartData
    }) 
    
    this.get_all_trending_products()
    });
}

getdata(){
  axios.get('/prediction/sales_forecasting',{headers: {token: Cookies.get('token')}})
    .then(response=>{
        this.setState({
        result:response.data.data1,
        error:response.data.data4,
        warnings:response.data.data5,
        file:response.data.file,
        buffering:false    
        }); 
        if(response.data.data3!="Key error")
        {
          this.get_trending_products();
        }   
      });
    
}
componentDidMount(){
  this.setState({buffering:true})
    axios.get('/check_is_upload',{headers: {token: Cookies.get('token')}})
    .then(response=>{
        console.log(response)
        this.setState({
            uploaded: response.data.data,
            file:response.data.file
        });    
        this.getdata()
      });
   
}
  render() 
  {
    if(!Cookies.get('token'))
    {
        this.setState({redirect:'/login'})
    }
    if(this.state.redirect)
    {
        return <Redirect to="/login"/>
    }
    return(
  <body class="fixed-navbar">
    <div class="page-wrapper">
    <Menubar name="sales"/>
  <div class="content-wrapper">
  <div class="page-content fade-in-up">
        <h1 style={{textAlign:'center'}}><u>Sales Forecasting</u></h1>
        {this.state.uploaded?
        <>
        {
        this.state.buffering?
        <>  
        <div style={{textAlign:'center',marginTop:20}}>
        <h3 class="text-danger" style={{textAlign:'center',marginTop:15}}>Sales Forecasting Running Please Wait..... </h3>
        <img className={styles.loader} style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:10,marginBottom:10}} src={buffering} alt="Buffering"/><br></br>
        <Skeleton count={10} height={30}/>
        <div>
          <br/>
          <br/>
          <br/>
          <br/>
          <span className={styles.marg}><Skeleton className={styles.radius} width={240} height={150} /></span>
          <span className={styles.marg}><Skeleton className={styles.radius} width={240} height={150}/> </span>
          <span className={styles.marg}><Skeleton className={styles.radius} width={240} height={150}/> </span>
          <span className={styles.marg}><Skeleton className={styles.radius} width={240} height={150}/> </span>
          <br/>
          <br/>
          <span className={styles.marg}><Skeleton className={styles.radius} width={240} height={150}/> </span>
          <span className={styles.marg}><Skeleton className={styles.radius} width={240} height={150}/> </span>
          <span className={styles.marg}><Skeleton className={styles.radius} width={240} height={150}/> </span>
          <span className={styles.marg}><Skeleton className={styles.radius} width={240} height={150}/> </span>
        </div>
        </div>
        </>
        :null
        }
        </>
        :
        <>
        <div style={{textAlign:'center',marginTop:50,marginBottom:30}}>
        <hr></hr>
        <h3 style={{marginTop:30}} class="text-center text-danger">Please upload your data first to preview data</h3>
        <a class="text-center btn btn-primary" href="/upload_data">Upload Data Now</a>
        </div>
        <hr></hr>
        </>
        }
    {this.state.result?
    <>
    {this.state.result!='Key error'?
    <>
     <div style={{textAlign:'center',marginBottom:20}}>
        <h2 class={this.state.file?"text-success":"text-danger"} style={{textAlign:'center',marginTop:20}}>
        Sales Forecasting Executed Successfully !</h2>
        {this.state.file? <a href={this.state.future_sales_file} class={'btn btn-primary btn-sm'}>Download Predicted File</a>:''}
      </div>

{this.state.is_sales_forecasting_run?
<div>
 <div className="container" style={{overflowX:'scroll'}}>
        <div class="row" style={this.state.checked?{width:2000,height:500,overflowX:'scroll',overflowY:'scroll'}:{}}>
                    <div class="col-lg-12">
                        <div class="ibox">
                            <div class="ibox-body">
                                <div class="flexbox mb-4">
                                    <div>
                                        <h3 class="m-0">Uploaded Data Statistics</h3>
                                        <div>Your uploaded data per day sales price graph is shown below</div>
                                    </div>
                                </div>
                                <div>
                                <Line data={this.state.chartsData} />
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                 <div class="text-right text-primary m-r-10" >
                 <input type="checkbox" 
                 checked={this.state.checked}
                 onChange={this.handleCheckboxChange}/>&nbsp;&nbsp;
                 <span style={{marginRight:20}}>Best Fit</span> 
                 </div>
                 </div>
: 
<div style={{textAlign:'center',marginTop:20}}>
<img className={styles.loader} style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:10,marginBottom:10}} src={buffering} alt="Buffering"/>
</div>
}
<br></br><br></br>
      <div class="row">
                    <div class="col-lg-7">
                        <div class="ibox">
                            <div class="ibox-body">
                                <div class="flexbox mb-4">
                                    <div>
                                        <h3 class="m-0">Overall Statistics</h3>
                                        <div>Your top 5 trending products by their sales quantity graph is shown below</div>
                                    </div>
                                </div>
                                <div>
                                <Line data={this.state.chartData} />
                              </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="ibox">
                            <div class="ibox-head">
                                <div class="ibox-title">Top trending products list by their sales quantity</div>
                            </div>
                           <div class="ibox-body">
                                <div class="row align-items-center">
                                <div className="container" style={{overflow:'scroll', height:'268px'}}>
                                <table class="table table-striped table-bordered table-responsive" style={{width:"100%"}}>
                                  <thead>
                                        <tr>
                                          <td><b>ID</b></td>
                                          <td><b>Description</b></td>
                                          <td><b>Quantity</b></td>
                                        </tr>
                                      </thead>
                                      <tbody>

                                        {this.state.all_trending_products?
                                        <>
                                        {this.state.all_trending_products.slice(1).map((data,index)=>(
                                          <tr>
                                          <td>{++index}</td>
                                          <td>{data[1]}</td>
                                          <td>{data[2]}</td>
                                          </tr>
                                        ))}
                                        </>:
                                         <div style={{textAlign:'center',marginTop:20}}>
                                        <img className={styles.loader} style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:10,marginBottom:10}} src={buffering} alt="Buffering"/>
                                       </div>
                                      }
                                      
                                      </tbody>
                                      <tfoot>
                                      <tr>
                                          <td><b>ID</b></td>
                                          <td><b>Description</b></td>
                                          <td><b>Quantity</b></td>
                                        </tr>
                                      </tfoot>
                                    </table>
                                    </div>
                                </div>
                                    <div style={{display: 'flex', justifyContent: 'flex-end',textAlign:'right'}}>
                                      <a class="btn btn-primary btn-sm" href={this.state.all_trending_products_file}>Export to CSV</a>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-7" style={{overflowX:'scroll'}}>
                        <div class="ibox">
                            <div class="ibox-body">
                                <div class="flexbox mb-4">
                                    <div>
                                        <h3 class="m-0">Overall Statistics</h3>
                                        <div>Your top 5 trending products by their sales price graph is shown below</div>
                                    </div>
                                </div>
                                <div>
                                <Line data={this.state.trend_by_sales} />                            
                              </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="ibox">
                            <div class="ibox-head">
                                <div class="ibox-title">Top trending products list by their sales price</div>
                            </div>
                           <div class="ibox-body">
                                <div class="row align-items-center">
                                <div className="container" style={{overflow:'scroll', height:'268px'}}>
                                <table class="table table-striped table-bordered table-responsive" style={{width:"100%"}}>
                                  <thead>
                                        <tr>
                                          <td><b>ID</b></td>
                                          <td><b>Description</b></td>
                                          <td><b>Sales</b></td>
                                        </tr>
                                      </thead>
                                      <tbody>
                                      {this.state.all_trending_products_by_sales?
                                        <>
                                        {this.state.all_trending_products_by_sales.slice(1).map((data,index)=>(
                                          <tr>
                                          <td>{++index}</td>
                                          <td>{data[1]}</td>
                                          <td>{data[2]}</td>
                                          </tr>
                                        ))}
                                        </>
                                        : 
                                        <div style={{textAlign:'center',marginTop:20}}>
                                          <img className={styles.loader} style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:10,marginBottom:10}} src={buffering} alt="Buffering"/>
                                        </div>
                                      }
                                      </tbody>
                                      <tfoot>
                                      <tr>
                                          <td><b>ID</b></td>
                                          <td><b>Description</b></td>
                                          <td><b>Sales</b></td>
                                        </tr>
                                      </tfoot>
                                    </table>
                                    </div>
                                </div>
                                    <div style={{display: 'flex', justifyContent: 'flex-end',textAlign:'right'}}>
                                      <a class="btn btn-primary btn-sm" href={this.state.all_trending_products_by_sales_file}>Export to CSV</a>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
{this.state.is_future_sales_forecasting_run?
<div>
 <div className="container" style={{overflowX:'scroll'}}>
        <div class="row" style={this.state.forecast_checked?{width:2000,height:500,overflowX:'scroll',overflowY:'scroll'}:{}}>
                    <div class="col-lg-12">
                        <div class="ibox">
                            <div class="ibox-body">
                                <div class="flexbox mb-4">
                                    <div>
                                        <h3 class="m-0">Future Forecasting Sales Data Statistics</h3>
                                        <div>Your Forecasting(future) sales data sales price graph is shown below</div>
                                    </div>
                                </div>
                                <div>
                                <Line data={this.state.forecastData} />
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                 <div class="text-right text-primary m-r-10" >
                 <input type="checkbox" 
                 checked={this.state.forecast_checked}
                 onChange={this.forecast_handleCheckboxChange}/>&nbsp;&nbsp;
                 <span style={{marginRight:20}}>Best Fit</span> 
                 </div>
                 </div>
: 
<div style={{textAlign:'center',marginTop:20}}>
<img className={styles.loader} style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:10,marginBottom:10}} src={buffering} alt="Buffering"/>
</div>
}
<br></br><br></br>
{this.state.future_sales?
<div>
 <div className="container">
        <div class="row">
                  <div class="col-lg-12">
                        <div class="ibox">
                            <div class="ibox-head">
                                <div class="ibox-title">Future Forecasting Sales Data</div>
                            </div>
                           <div class="ibox-body">
                                <div class="row align-items-center">
                                <div className="container" style={{overflow:'scroll', height:'450px'}}>
                                <table class="table table-striped table-bordered" style={{width:"100%"}}>
                                  <thead>
                                        <tr>
                                          <td><b>ID</b></td>
                                          <td><b>Date</b></td>
                                          <td><b>Predicted Sales</b></td>
                                          <td><b>Higher Predicted Sales</b></td>
                                          <td><b>Lower Predicted Sales</b></td>
                                        </tr>
                                      </thead>
                                      <tbody>
                                      {this.state.future_sales?
                                        <>
                                        {this.state.future_sales.slice(1).map((data,index)=>(
                                          <tr>
                                          <td>{++index}</td>
                                          <td>{data[1]}</td>
                                          <td>{data[2]}</td>
                                          <td>{data[3]}</td>
                                          <td>{data[4]}</td>
                                          </tr>
                                        ))}
                                        </>
                                        : 
                                        <div style={{textAlign:'center',marginTop:20}}>
                                          <img className={styles.loader} style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:10,marginBottom:10}} src={buffering} alt="Buffering"/>
                                        </div>
                                      }
                                      </tbody>
                                      <tfoot>
                                      <tr>
                                          <td><b>ID</b></td>
                                          <td><b>Date</b></td>
                                          <td><b>Predicted Sales</b></td>
                                          <td><b>Higher Predicted Sales</b></td>
                                          <td><b>Lower Predicted Sales</b></td>
                                        </tr>
                                      </tfoot>
                                    </table>
                                    </div>
                                </div>
                                <div class="row">
                                <div class="col-md-6">
                                  <br></br>
                                <h5 class="text-danger">
                                  <b>{this.state.error}</b>
                                </h5>
                                  </div>
                                  <div class="col-md-6">
                                  <div style={{display: 'flex', justifyContent: 'flex-end',textAlign:'right'}}>
                                      <a class="btn btn-primary btn-sm" href={this.state.future_sales_file}>Export to CSV</a>
                                    </div>
                                  </div>
                                </div>
                                   
                            </div>
                        </div>
                    </div>            
                </div>
                </div>
                </div>
: 
<div style={{textAlign:'center',marginTop:20}}>
<img className={styles.loader} style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:10,marginBottom:10}} src={buffering} alt="Buffering"/>
</div>
}
<br></br>
</>:     
<>
<div className="container" style={{marginTop:40}}>
<div class="row">
<div class="col-lg-12">
<div class="ibox">
<div class="ibox-head">
<div class="ibox-title">
<b style={{fontSize:'18px'}} class="text-danger">Error in Running Sales Forecasting</b></div>
</div>
<div class="ibox-body">
<div class="row align-items-center">
<div className="container"> 
<h5 class="text-center text-danger" style={{marginTop:10}}>
Key error: "None of [Index(['invoiceno', 'description', 'quantity', 'invoicedate', 'customerid',\n 'unitprice', 'country'],\n dtype='object')] are in the [columns]" !</h5>
<h4>Note : </h4>
<h5 class="text-center">['invoiceno', 'description', 'quantity', 'invoicedate', 'customerid', 'unitprice', 'country'] must be present in .csv file to run thius prediction successfully !</h5>
</div>
</div>
</div>
</div>
</div>            
</div>
</div>
</>
}
{this.state.warnings?
<div>
 <div className="container">
        <div class="row">
                  <div class="col-lg-7">
                        <div class="ibox">
                            <div class="ibox-head">
                                <div class="ibox-title"><b>Which Model We are Using?</b></div>
                            </div> 
                           <div class="ibox-body">
                                <div class="row align-items-center">
                                <div className="container" style={{overflow:'scroll', height:'420px'}}>

                                  <h5><b>What is FBProphet?</b></h5>
                                  <p style={{textAlign:'justify'}}>
                                  Prophet is a procedure for forecasting time series data based on 
                                  an additive model where non-linear trends are fit with yearly, 
                                  weekly, and daily seasonality, plus holiday effects. It works best 
                                  with time series that have strong seasonal effects and several 
                                  seasons of historical data. Prophet is robust to missing data and 
                                  shifts in the trend, and typically handles outliers well.
                                 </p> 
                                 <h5><b>Why FBProphet?</b></h5>                                 
                                  <p style={{textAlign:'justify'}}>
                                  FBProphet uses time as a regressor and tries to fit several linear 
                                  and nonlinear function of time as components. By default, FBProphet
                                  will fit the data using a linear model but it can be changed to the 
                                  nonlinear model (logistics growth) from its arguments. It uses decomposable 
                                  time series model with 3 main components: combined into this equation: 
                                  </p>
                                  <p style={{textAlign:'center'}}>f(x) = g(x) + s(x) + h(x) + e(t)</p>
                                  <p style={{textAlign:'justify'}}>Prophet is open source software released by Facebook’s Core Data Science team.</p>
                                  <h5><b>How to Use?</b></h5>
                                  <p style={{textAlign:'justify'}}>
                                  Prophet follows the sklearn model API. We create an instance of the Prophet class and then call its fit and predict methods.<br></br>
                                  The input to Prophet is always a dataframe with two columns: ds and y. The ds (datestamp) column should be of a format expected by Pandas, ideally YYYY-MM-DD for a date or YYYY-MM-DD HH:MM:SS for a timestamp. The y column must be numeric, and represents the measurement we wish to forecast.
                                  </p>
                                  <h4><b>FBProphet Advantages</b></h4>
                                  <h5><b>Accurate and Fast</b></h5>
                                  <p style={{textAlign:'justify'}}>
                                  Prophet is used in many applications across Facebook for producing 
                                  reliable forecasts for planning and goal setting. We’ve found it to
                                  perform better than any other approach in the majority of cases. 
                                  We fit models in Stan so that you get forecasts in just a few 
                                  seconds.
                                  </p>
                                  <h5><b>Fully Automatic</b></h5>
                                  <p style={{textAlign:'justify'}}>
                                  Get a reasonable forecast on messy data with no manual effort. 
                                  Prophet is robust to outliers, missing data, and dramatic changes 
                                  in your time series.
                                  </p>
                                  <h5><b>Tunable Forecasts</b></h5>
                                  <p style={{textAlign:'justify'}}>
                                  The Prophet procedure includes many possibilities for users to 
                                  tweak and adjust forecasts. You can use human-interpretable 
                                  parameters to improve your forecast by adding your domain knowledge.<br></br>
                                  <br></br><b>For more info Visit :</b>&nbsp;&nbsp;<a href="https://facebook.github.io/prophet/docs/quick_start.html">Facebook Prophet Official Website</a></p>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>     
                    <div class="col-lg-5">
                        <div class="ibox">
                            <div class="ibox-head">
                                <div class="ibox-title"><b>Warnings During Running Sales Forecasting</b></div>
                            </div>
                           <div class="ibox-body">
                                <div class="row align-items-center">
                                <div className="container">
                            <marquee width="100%" direction="up" height="420px" scrollamount="3">
                            <p class="text-danger" style={{textAlign:'justify'}}>
                              {this.state.warnings}
                              </p>
                            </marquee>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                </div>
:''}
</>:''
}
<Footer/>
</div>
</div>
<Setting_Menu/>
</div>
</body>
    );
  };
}

export default Sales_Forecasting;