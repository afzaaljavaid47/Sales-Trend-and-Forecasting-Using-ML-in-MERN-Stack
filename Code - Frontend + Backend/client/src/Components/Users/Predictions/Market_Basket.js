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
import buffering1 from '../../../images/sf-illustration.svg';
import buffering2 from '../../../images/img-1.svg';

class Market_Basket extends Component {
  constructor(props){
    super(props)
    this.state = {
        uploaded: 0,
        buffering: false,
        file:null,
        result:null,
        data:null
    }
}
get_Predicted_Preview_Data(){
  axios.get('/prediction/market_basket/preview_data',{headers: {token: Cookies.get('token')}})
    .then(response=>{
        console.log(response.data.data)
        this.setState({
            data:response.data.data
        });    
    });
}
getdata(){
  axios.get('/prediction/market_basket',{headers: {token: Cookies.get('token')}})
    .then(response=>{
        console.log(response)
        this.setState({
        result:response.data.data,
        file:response.data.file,
        buffering:false    
        }); 
        if(response.data.data!="Key error")
        {
          this.get_Predicted_Preview_Data()
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
    });
    this.getdata()
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
    <Menubar name="AFZ"/>
  <div class="content-wrapper">
  <div class="page-content fade-in-up">
        <h1 style={{textAlign:'center'}}><u>Market Basket Analysis</u></h1>
        {this.state.uploaded?
        <>
        {
        this.state.buffering?
        <>  
        <div style={{textAlign:'center'}}>
        <h3 class="text-danger" style={{textAlign:'center',marginTop:20,marginBottom:15}}>Market Basket Analysis Running Please Wait..... </h3>
        <img className={styles.loader} style={{flex:1,justifyContent:'center',alignItems:'center'}} src={buffering} alt="Buffering"/><br></br>
        <img style={{flex:1,justifyContent:'center',alignItems:'center'}} src={buffering2} alt="Buffering"/>
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
    <div style={{textAlign:'center'}}>
      <h2  class={this.state.file?"text-success":"text-danger"} style={{textAlign:'center',marginTop:30}}>
        {this.state.result} !</h2>
        </div>
        {this.state.file?
        <>
        <div style={{textAlign:'center'}}>
         <a href={this.state.file} class={'btn btn-primary btn-sm'}>Download Output Association Rules</a>
        </div>
         <div class="row" style={{marginTop:10}}>
          <div class="col-md-5">
            <img style={{marginTop:10}} src={buffering1} alt="Market Basket Analysis"/>
          </div>
          <div class="col-md-7">
            <p style={{marginTop:20,textAlign:'justify'}}>
            Apriori is an algorithm for frequent item set mining and <b>association rule 
            learning</b> over relational databases. It proceeds by identifying the <b>frequent
            individual items</b> in the database and extending them to larger and larger 
            item sets as long as those item sets appear sufficiently often in the 
            database.
            </p>
            Some of the most important terms used in this algorithm are:
              <li><b>Antecedents</b></li>
              <p>An antecedent is an item found within the data. </p>
              <li><b>Consequents</b></li>
              <p>A consequent is an item found in combination with the antecedent.</p>
              <li><b>Support</b></li>
              <p>Support refers to items' frequency of occurrence. It is calculated by counting the data points.</p>
              <li><b>Confidence</b></li>
              <p>Conditional probability that a transaction contains <b>Antecedents</b> also contains <b>Consequents</b> </p>
              <li><b>Lift</b></li>
              <p>It shows the importance of a rule. if <b>lift=1</b> then no association, if <b>lift > 1</b> association occures.</p>
          </div>

          </div>
       {this.state.data?
        <>
        <h2 style={{marginTop:25,marginBottom:30}}><u>Association Rules Results</u></h2>
        <div className="container" style={{overflow:'scroll', height:'600px',marginBottom:'30px'}}>
        <table style={{marginTop:"200px"}} class="table table-striped table-bordered table-responsive" style={{width:"100%"}}>
        <thead>
            <tr>
                <th>ID</th>
                <th>Antecedents</th>
                <th>Consequents</th>
                <th>Support</th>
                <th>Confidence</th>
                <th>Lift</th>
            </tr>
        </thead>
        <tbody>    
        {this.state.data.slice(1).map((data,index)=>(
                    <tr>
                        <td>{index}</td>
                        <td>{data[1]}</td>
                        <td>{data[2]}</td>
                        <td>{parseFloat(data[3]).toFixed(3)}</td>
                        <td>{parseFloat(data[4]).toFixed(3)}</td>
                        <td>{parseFloat(data[5]).toFixed(3)}</td>
                    </tr>
        ))}
        </tbody>
        <tfoot>
            <tr>
            <th>ID</th>
                <th>Antecedents</th>
                <th>Consequents</th>
                <th>Support</th>
                <th>Confidence</th>
                <th>Lift</th>
           </tr>
        </tfoot>
    </table>
    </div>
    </>
      :
      <>
      <div style={{textAlign:'center',marginTop:20,marginBottom:20}}>
      <h4>Frequent Patterens Data Loading Please Wait !</h4><br></br>
      <img src={buffering} alt=""/>
      </div>
      </>
       }
        </>
        :
        <>
        <div style={{textAlign:'center'}}>
          <p style={{fontSize:18,marginTop:20}}>
          For this prediction to work, the following columns must be 
          present In your excel file or there may be some server problem.<br></br>
          <b>InvoiceNo, Description, Quantity and UnitPrice etc.</b></p>
          <img style={{marginTop:15}} src={buffering2} alt=""/>
        </div>
        </>
        }
      </>
      :
<>
<div className="container" style={{marginTop:40}}>
<div class="row">
<div class="col-lg-12">
<div class="ibox">
<div class="ibox-head">
<div class="ibox-title">
<b style={{fontSize:'18px'}} class="text-danger">Error in Running Market Basket Analysis</b></div>
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
</>
:''
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

export default Market_Basket;