import React, { Component } from 'react';
import styles from '../../../css/uploaddata.module.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import Sample_File from '.././Sample_File2.csv'
import Menubar from '.././Menubar'
import Footer from '.././Footer'
import Setting_Menu from '.././Setting_Menu'
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'
import buffering from '../../../images/buffering.gif';
import buffering1 from '../../../images/undraw_personal_finance_tqcd.svg';
import swal from 'sweetalert'
import Skeleton from 'react-loading-skeleton';

export default class Responce_Modeling extends Component {
constructor(props){
super(props)
this.state = {
redirect:null,
selectedFile: null,
uploaded: 0,
buffering: false,
file:'',
analysis_file:null,
running:false,
result:null,
table_data:null,
err:null,
data1:null,
data2:null,
data3:null,
data4:null,
data5:null,
data6:null,
data7:null,
data8:null,
}
}
market_responce_modeling=()=>{
this.setState({
running:true
})
axios.get('/prediction/market_responce',{headers: {token: Cookies.get('token')}})
.then(response=>{
console.log(response)
this.setState({
analysis_file:response.data.file,
running:false,
err:response.data.err,
data1:response.data.data1,
data2:response.data.data2,
data3:response.data.data3,
data4:response.data.data4,
data5:response.data.data5,
data6:response.data.data6,
data7:response.data.data7,
data8:response.data.data8,
}); 
});
}
onClickHandler = (e) => {
e.preventDefault()  
if(this.state.selectedFile)
{ 
this.setState({
buffering:true
})
const form = new FormData();
form.append("file", this.state.selectedFile);
axios.post('/upload_data_market',form, {headers: {token: Cookies.get('token')}}, {
onUploadProgress: ProgressEvent => {
this.setState({
loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
})
}, 
})
.then(res=>{
console.log(res.data)
swal("Success!",res.data , "success");
document.getElementById('upload').reset();
this.setState({uploaded:1})
})
.then(data => {
this.setState({
buffering:false
})
this.market_responce_modeling()
})
.catch(err => { 
alert('Some Errors Try Again')
this.setState({
buffering:false
})
})
}
else{
swal("Error!",'Please Select a file first to upload !',"error");
}
}
onChangeHandler = event=>{
this.setState({
selectedFile: event.target.files[0],
loaded: 0,
})
}
componentDidMount(){
axios.get('/check_is_upload_market',{headers: {token: Cookies.get('token')}})
.then(response=>{
console.log(response)
this.setState({
uploaded: response.data.data,
file:response.data.file
});
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
<Menubar name="MEM"/>
<div class="content-wrapper">
<div class="page-content fade-in-up">
<div> 
<div className={'row'} style={{marginTop:'20px'}}> 
<div className={'col-2'}></div>
<div className={'col-8'}>

<div class="card">
<div class="card-header"> 
<div className={styles.first_heading}>Upload your data in .csv format</div></div>
<form onSubmit={(e)=>this.onClickHandler} id="upload">
<div class="card-body">
<div className="custom-file">
<input type="file" name="file" onChange={this.onChangeHandler} accept=".csv" required/>
</div>
</div>
<div class="card-footer">
<button type="submit" className={'btn btn-primary btn-sm'} onClick={this.onClickHandler}>Upload Data</button>
<a className={'btn btn-primary btn-sm'} href={Sample_File}>Download Sample File</a>
{
this.state.buffering?  
<img className={styles.loader} src={buffering} alt="Buffering"/>:null
}
{ this.state.uploaded == true &&<>
<br></br><span style={{fontSize:17}} className="text-success">We have already store your data</span>
<a href={this.state.file}> Download Uploaded File</a>
</>}
</div>
</form>
{ this.state.uploaded == true &&<>
<button className={'btn btn-success btn-lg'} onClick={this.market_responce_modeling}>Run Market Responce Modeling</button>
</>}

</div>
</div>
<div className={'col-2'}></div>
</div>

<div>
{this.state.running?
<>
<div style={{textAlign:'center',marginTop:20}}>
<h3 class="text-danger" style={{textAlign:'center',marginTop:15}}>Market Responce Modeling Running Please Wait..... </h3>
<img className={styles.loader} style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:10,marginBottom:10}} src={buffering} alt="Buffering"/><br></br>
<Skeleton count={10} height={30}/>
<div>
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
:null}
{this.state.err?
<>
{this.state.err!='Key error'?
<>
<div className="container" style={{marginTop:20}}>
<div class="row">
<div class="col-lg-12">
<div class="ibox">
<div class="ibox-head">
<div class="ibox-title"><b style={{fontSize:'18px'}}>What is Market Responce Modeling?</b></div>
</div>
<div class="ibox-body">
<div class="row align-items-center">
<div className="container">
<div className={'row'}>
<div class="row" style={{padding:10}}>      
<div class="col-md-5">
<img style={{marginTop:30}} src={buffering1} alt="Uplift Modeling"/>
</div>
<div class="col-md-7">
<p style={{textAlign:'justify'}}>
<b>Market Response Models</b> are intended to help scholars and managers understand how consumers individually and collectively respond to marketing activities, and how competitors interact. Appropriately estimated effects constitute a basis for improved decision making in marketing.
We review the demand and supply of market response models and we highlight areas of future growth. We discuss two characteristics that favour model use in practice, viz. the supply of standardized models and the availability of empirical generalizations.
</p>
<p><b>Market Response Model</b> - a model that predicts economic responses to scarcity of a resource will lead to increases in prices that will result either in decreased demand for that resource or increased supply or both.</p>
<h5><b>Types</b></h5>
<ul>
<li>Customer Segmentation</li>
<li>Customer Lifetime Value Prediction</li>
<li>Churn Prediction</li>
<li>Predicting Next Purchase Day</li>
<li>Predicting Sales</li>
<li>Uplift Modeling</li>
</ul>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>            
</div>
</div>

<div>
<div className="container">
<div class="row">
<div class="col-lg-8">
<div class="ibox">
<div class="ibox-head">
<div class="ibox-title">
<b style={{fontSize:'19px'}} class="text-success">Market Responce Modeling Executed Successfully !</b>
</div>
</div> 
<div class="ibox-body">
<div class="row align-items-center">
<div className="container" style={{overflow:'scroll', height:'435px'}}> 
<ul>
<li><h5><b>Actual Discount Orders : </b>{this.state.data1}</h5></li>
<p style={{fontSize:'15px',textAlign:'justify'}}>
A target market refers to a group of potential customers to whom a company wants to sell its products and services. This group also includes specific customers to whom a company directs its marketing efforts.
</p>
<li><h5><b>Predicted Discount Orders : </b>{this.state.data2}</h5></li>
<p style={{fontSize:'15px',textAlign:'justify'}}>
Calculating conversion is actually fairly easy. All you have to do is divide the number of conversions you get in a given time frame by the total number of people who visited your site or landing page and multiply it by 100%.
</p>
<li><h5><b>Actual Discount Revenue : </b>{this.state.data3}</h5></li>
<p style={{fontSize:'15px',textAlign:'justify'}}>
Order discounts relate to a whole order. Specifically, these discounts apply to the sum of prices of product items (including selected product options) added to the shopping cart.
</p>
<li><h5><b>Predicted Discount Orders : </b>{this.state.data4}</h5></li>
<p style={{fontSize:'15px',textAlign:'justify'}}>
Discounting is a financial mechanism in which a debtor obtains the right to delay payments to a creditor, for a defined period of time, in exchange for a charge or fee. 
</p>
<li><h5><b>Actual Bogo Orders : </b>{this.state.data5}</h5></li>
<p style={{fontSize:'15px',textAlign:'justify'}}>Understanding the Concept and Science of Revenue Lift Measurement. In order to successfully measure revenue uplift, the focus is to remove the potential revenue generated by customers who would pay full value for the product.
</p>
<li><h5><b>Predicted Bogo Orders : </b>{this.state.data6}</h5></li>
<p style={{fontSize:'15px',textAlign:'justify'}}>
Provider of a savings platform intended to connect restaurant owners with customers. The company's platform offers vouchers and information of different restaurants, enabling customers to save their money using their vouchers and for restaurant owners to boost their revenue.
</p>
<li><h5><b>BOGO Accuracy : </b>{this.state.data7}%</h5></li>
<p style={{fontSize:'15px',textAlign:'justify'}}>
With a target audience, you can decide what items to exhibit in your Buy One, Get One Free promotion efficiently. Creating a target audience can help you win the hearts of shoppers and make a promotion efficient.
</p>
<li><h5><b>Discount Accuracy : </b>{this.state.data8}%</h5></li>
<p style={{fontSize:'15px',textAlign:'justify'}}>
The discount rate is the interest rate used to determine the present value of future cash flows in a discounted cash flow (DCF) analysis.
</p>
<br></br> 
</ul>
</div>
</div>
</div>
</div>
</div>     
<div class="col-lg-4">
<div class="ibox">
<div class="ibox-head">
<div class="ibox-title"><b class="text-danger">Warnings During Analysis</b></div>
</div>
<div class="ibox-body">
<div class="row align-items-center">
<div className="container">
<marquee width="100%" direction="up" height="420px" scrollamount="3">
<p class="text-danger">
<p>{this.state.err}</p>
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
</>:
<>
<div className="container" style={{marginTop:20}}>
<div class="row">
<div class="col-lg-12">
<div class="ibox">
<div class="ibox-head">
<div class="ibox-title">
<b style={{fontSize:'18px'}} class="text-danger">Error in Running Churn Analysis</b></div>
</div>
<div class="ibox-body">
<div class="row align-items-center">
<div className="container"> 
<h5 class="text-center text-danger" style={{marginTop:10}}>
Key error: "None of [Index(['offer', 'conversion'], dtype='object')] are in the [columns]"
</h5>
<h4>Note : </h4>
<h5 class="text-center">['offer', 'conversion'] must be present in .csv file to run thius prediction successfully !</h5>
</div>
</div>
</div>
</div>
</div>            
</div>
</div>
</>}
</>
:<></>}
</div>
</div>
<Footer/>
</div>
</div>
<Setting_Menu/>
</div>
</body>
);
};
}