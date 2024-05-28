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
import Skeleton from 'react-loading-skeleton';
import {Pie} from 'react-chartjs-2';
import ltv from '../../../images/ltv.png'

class LTV_Prediction extends Component {
  constructor(props){
    super(props)
    this.state = {
        uploaded: 0,
        buffering: false,
        file:null,
        result:'',
        data:null,
        plot_data:false,
        labels:['Low-Value','Mid-Value','High-Value'],
        datasets: [{
                  label: 'Pie chart',
                  data: [],
                  backgroundColor:['red','blue','green']
                  
            }],
    }
}
get_Predicted_Preview_Data(){
  axios.get('/prediction/ltv/preview_data',{headers: {token: Cookies.get('token')}})
    .then(response=>{
        console.log(response.data.data)
        this.setState({
            data:response.data.data
        });    
    });
}
plotGraph = () => {
  axios.get('/prediction/ltv/plot-graph',{headers: {token: Cookies.get('token')}})
      .then(response => {
          this.state.datasets[0].data=response.data.val
          this.setState({plot_data:true})
          this.get_Predicted_Preview_Data()
      });
}
getdata(){
  axios.get('/prediction/ltv',{headers: {token: Cookies.get('token')}})
    .then(response=>{
        console.log(response)
        this.setState({
        result:response.data.data,
        file:response.data.file,
        buffering:false    
        });  
        if(response.data.data!="Key error")
        {
          this.plotGraph()  
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
    <Menubar name="LTV"/>
  <div class="content-wrapper">
  <div class="page-content fade-in-up">
        <h2 style={{textAlign:'center'}}><u>Customer Lifetime Value Analysis</u></h2>
        {this.state.uploaded?
        <>
        {
        this.state.buffering?
        <>  
        <div style={{textAlign:'center'}}>
        <h3 class="text-danger" style={{textAlign:'center',marginTop:14}}>Customer Lifetime Value Analysis Running Please Wait..... </h3>
        <img className={styles.loader} style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:10,marginBottom:10}} src={buffering} alt="Buffering"/>
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
        <div style={{textAlign:'center'}}>
      <h3  class={this.state.file?"text-success":"text-danger"} style={{textAlign:'center',marginTop:15}}>
        {this.state.result} !</h3>
        {this.state.file? <a href={this.state.file} class={'btn btn-primary btn-sm'}>Download LTV File</a>:''}
      </div>

{this.state.plot_data?
<div>
 <div className="container" style={{marginTop:15,paddingBottom:20}}>
<div class="row" >
<div class="col-lg-12">
<div class="ibox">
<div class="ibox-body">
    <div class="flexbox mb-4">
        <div>
            <h3 class="m-0">Lifetime Value Statistics</h3>
            <div>The customer lifetime value Pie chart is shown below</div>
        </div>
    </div>
    <div>
    <div style={{marginBottom:25}}>
    <Pie
        labels='pie'
        data={{
        labels:this.state.labels,
        datasets:this.state.datasets
        }}
        options={{
          legend:{
            display:true,
            position:'left'
          }
        }}
    />
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
</>:
<>
<div className="container" style={{marginTop:40}}>
<div class="row">
<div class="col-lg-12">
<div class="ibox">
<div class="ibox-head">
<div class="ibox-title">
<b style={{fontSize:'18px'}} class="text-danger">Error in Running Customer Lifetime Value Analysis</b></div>
</div>
<div class="ibox-body">
<div class="row align-items-center">
<div className="container"> 
<h5 class="text-center text-danger" style={{marginTop:10}}>
Key error: "['invoicedate', 'quantity', 'unitprice'] not in index" !</h5>
<h4>Note : </h4>
<h5 class="text-center">['invoicedate', 'quantity', 'unitprice'] must be present in .csv file to run thius prediction successfully !</h5>
</div>
</div>
</div>
</div>
</div>            
</div>
</div>
</>

}
      </>:''
      
}
{this.state.data?
<div>
 <div className="container">
        <div class="row">
        <div class="col-lg-8">
                        <div class="ibox">
                            <div class="ibox-head">
                                <div class="ibox-title"><b>LTV Description</b></div>
                            </div>
                           <div class="ibox-body">
                                <div class="row align-items-center">
                                <div className="container" style={{overflow:'scroll', height:'470px'}}>
                                <h5><b>What is Customer Lifetime Value?</b></h5>
                                  <p style={{textAlign:'justify'}}>
                                  The customer lifetime value (LTV), also known as lifetime value, is the total revenue a company expects to earn over the lifetime of their relationship with a single customer. The customer lifetime value calculation accounts for the customer acquisition costs, operating expenses, and costs to produce the goods or services that the company is manufacturing. Many companies tend to overlook the LTV metric but the lifetime value of customers is essential to the growth of a company.
                                  </p> 
                                  <div style={{textAlign:'center',marginTop:10,marginBottom:20}}>
                                  <img style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:10,marginBottom:10}} src={ltv} alt="Buffering"/>
                                  </div>
                                 <h5><b>How to Calculate the LTV of a Company?</b></h5>                                 
                                 <ul>
                                    <li><b>Average purchase value</b> <p style={{textAlign:'justify'}}>It is calculated by dividing the company’s total revenue over a period of time by the total purchases made by its customers during that same timeframe.</p></li>
                                    <li><b>Average purchase frequency rate</b> <p style={{textAlign:'justify'}}>It is calculated by the total purchases made over a period of time by the individual customers that made those purchases during that time.</p></li>
                                    <li><b>Customer value</b> <p style={{textAlign:'justify'}}>It is calculated by multiplying the average value of the purchase by the number of times the purchase is made.</p></li>
                                    <li><b>Average customer lifespan</b> <p style={{textAlign:'justify'}}>It is the average number of years that a customer continues to buy the company’s goods and services.</p></li>
                                    <li><b>Lifetime value calculation</b> <p style={{textAlign:'justify'}}>The LTV is calculated by multiplying the value of the customer to the business by their average lifespan. It helps a company identify how much revenue they can expect to earn from a customer over the life of their relationship with the company.</p></li>
                                  </ul> 
                                 <h5><b>What Factors Contribute to Lifetime Value?</b></h5>    
                                  <p style={{textAlign:'justify'}}>The lifetime value of a business depends on how popular the brand is among customers. For example, if a customer lacks any loyalty to the brand and does not face any switching costs when buying a rival company’s product, it can result in a negative impact on the lifetime value of the company. Following are the factors that affect the LTV of a company:</p>                             
                                 <ol>
                                   <li><b>Churn Rate</b></li>
                                   <p style={{textAlign:'justify'}}>The churn rate describes how often customers stop shopping at a business that they were once loyal customers of. The rate can differ from business to business and depends on the competitive advantage of the company and their ability to keep customers interested in their products. Usually, small businesses and startups tend to face a high churn rate.</p>
                                   <li><b>Brand Loyalty</b></li>
                                   <p style={{textAlign:'justify'}}>It measures how loyal the customers are to the brand and who keep buying their goods and services. Building brand loyalty can help retain customers and decrease the churn rate. A company with a lot of loyal customers will generate a high lifetime value.</p>
                                 </ol>               
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  <div class="col-lg-4">
                        <div class="ibox">
                            <div class="ibox-head">
                                <div class="ibox-title"><b>Customer Segmented File Preview</b></div>
                            </div> 
                           <div class="ibox-body">
                                <div class="row align-items-center">
                                <div className="container" style={{overflow:'scroll', height:'420px'}}>
                                <table class="table table-striped table-bordered" style={{width:"100%"}}>
                                  <thead>
                                        <tr>
                                          <td><b>ID</b></td>
                                          <td><b>Customer ID</b></td>
                                          <td><b>Segment</b></td>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {this.state.data.slice(1).map((data,index)=>(
                                          <tr>
                                          <td>{++index}</td>
                                          <td>{data[1]}</td>
                                          <td>{data[2]}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                      <tfoot>
                                      <tr>
                                          <td><b>ID</b></td>
                                          <td><b>Customer ID</b></td>
                                          <td><b>Segment</b></td>
                                      </tr>
                                      </tfoot>
                                    </table>
                                 </div>
                                </div>
                               
                                  <div style={{display: 'flex', justifyContent: 'flex-end',textAlign:'right'}}>
                                      <a class="btn btn-primary btn-sm" href={this.state.file}>Export to CSV</a>
                                  </div>
                                  

                            </div>
                        </div>
                    </div>     
</div>
</div>
</div>
:
''
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

export default LTV_Prediction;