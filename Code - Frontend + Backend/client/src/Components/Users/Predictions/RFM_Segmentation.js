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
import rfm_illustration from '../../../images/s-illustration.svg'
import {Scatter} from 'react-chartjs-2';
import Skeleton from 'react-loading-skeleton';

class RFM_Segmentation extends Component {
  constructor(props){
    super(props)
    this.state = {
        uploaded: 0,
        buffering: false,
        file:null,
        checked:false,
        checked1:false,
        rfm_data:null,
        rfm_file:null,
        rfm_executed:false,
        checked2:false,
        result:'',
        data: {
            datasets: [{
                label: 'Revenue vs Recency',
                data: [],
                
            }],
            
        },
        pointBackColor:[],
        data2: {
            datasets: [{
                label: 'Frequency vs Revenue',
                data: [],
                
            }],
            
        },
        pointBackColor2:[],
        data3: {
            datasets: [{
                label: 'Frequency vs Recency',
                data: [],
                
            }],
            
        },
        pointBackColor3:[],
        rfm_executed:false
    }
}
show_data(){
    axios.get('/prediction/rfm/show_data',{headers: {token: Cookies.get('token')}})
    .then(response => {
       this.setState({rfm_data:response.data.data,rfm_file:response.data.file})
    this.setState({rfm_executed:true})  
    });

}
handleCheckboxChange = event =>
    this.setState({ checked: event.target.checked })
handleCheckboxChange1 = event =>
    this.setState({ checked1: event.target.checked })
handleCheckboxChange2 = event =>
    this.setState({ checked2: event.target.checked })
plotGraph = () => {
    axios.get('/prediction/rfm/plot-graph',{headers: {token: Cookies.get('token')}})
        .then(response => {
            this.state.data=response.data.val;
            this.state.pointBackColor=response.data.pointcolor   
            this.state.data2=response.data.val2;
            this.state.pointBackColor2=response.data.pointcolor2            
            this.state.data3=response.data.val3;
            this.state.pointBackColor3=response.data.pointcolor3
            this.setState({
                rfm_executed:true
            }) 
            this.show_data()    
        });
}

getdata(){
  axios.get('/prediction/rfm/',{headers: {token: Cookies.get('token')}})
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
    <Menubar name="RFM"/>
  <div class="content-wrapper">
  <div class="page-content fade-in-up">
        <h2 style={{textAlign:'center'}}><u>RFM(Recency, Frequency, Monetary) Segmentation</u></h2>
        {this.state.uploaded?
        <>
        {
        this.state.buffering?
        <>  
        <div style={{textAlign:'center',marginTop:20}}>
        <h3 class="text-danger" style={{textAlign:'center'}}>RFM Segmentation Running Please Wait..... </h3>
        <img className={styles.loader} style={{flex:1,justifyContent:'center',alignItems:'center',marginBottom:15}} src={buffering} alt="Buffering"/>
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
        <div style={{textAlign:'center',marginTop:40,marginBottom:30}}>
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
        <div style={{textAlign:'center',marginBottom:15}}>
       <h2 class={this.state.file?"text-success":"text-danger"} style={{textAlign:'center',marginTop:20}}>
        {this.state.result} !</h2>
        {this.state.file? <a href={this.state.file} class={'btn btn-primary btn-sm'}>Download Segmented File</a>:''}
      </div>
       </>
       :
       <>
<div className="container" style={{marginTop:40}}>
<div class="row">
<div class="col-lg-12">
<div class="ibox">
<div class="ibox-head">
<div class="ibox-title">
<b style={{fontSize:'18px'}} class="text-danger">Error in Running RFM Segmentation</b></div>
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
      </>
      :''}
{this.state.rfm_executed?
<>
<div>
 <div className="container" style={{overflowX:'scroll'}}>
<div class="row" style={this.state.checked?{width:2000,height:500,overflowX:'scroll',overflowY:'scroll'}:{}}>

<div class="col-lg-12">
<div class="ibox">
<div class="ibox-body">
<div class="flexbox mb-4">
<div>
<h3 class="m-0">Revenue vs Recency</h3>
<div></div>
</div>
</div>
<div>

<Scatter
width={4}
height={2}
data={this.state.data}
options={{
    maintainAspectRatio:true,
    elements: {
    point: {
        backgroundColor:this.state.pointBackColor
    }
    }  
}}
/>

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

<div style={{marginTop:15}}>
 <div className="container" style={{overflowX:'scroll'}}>
<div class="row" style={this.state.checked1?{width:2000,height:500,overflowX:'scroll',overflowY:'scroll'}:{}}>

<div class="col-lg-12">
<div class="ibox">
<div class="ibox-body">
<div class="flexbox mb-4">
<div>
<h3 class="m-0">Frequency vs Revenue</h3>
<div></div>
</div>
</div>
<div>

<Scatter
width={4}
height={2}
data={this.state.data2}
options={{
    maintainAspectRatio:true,
    elements: {
    point: {
        backgroundColor:this.state.pointBackColor
    }
    }  
}}
/>

</div>
</div>
</div>
</div>

</div>
</div>
<div class="text-right text-primary m-r-10" >
<input type="checkbox" 
checked={this.state.checked1}
onChange={this.handleCheckboxChange1}/>&nbsp;&nbsp;
<span style={{marginRight:20}}>Best Fit</span> 
</div>
</div>


<div style={{marginTop:15}}>
 <div className="container" style={{overflowX:'scroll'}}>
<div class="row" style={this.state.checked2?{width:2000,height:500,overflowX:'scroll',overflowY:'scroll'}:{}}>

<div class="col-lg-12">
<div class="ibox">
<div class="ibox-body">
<div class="flexbox mb-4">
<div>
<h3 class="m-0">Frequency vs Recency</h3>
<div></div>
</div>
</div>
<div>

<Scatter
width={4}
height={2}
data={this.state.data3}
options={{
    maintainAspectRatio:true,
    elements: {
    point: {
        backgroundColor:this.state.pointBackColor
    }
    }  
}}
/>

</div>
</div>
</div>
</div>

</div>
</div>
<div class="text-right text-primary m-r-10" >
<input type="checkbox" 
checked={this.state.checked2}
onChange={this.handleCheckboxChange2}/>&nbsp;&nbsp;
<span style={{marginRight:20}}>Best Fit</span> 
</div>
</div>

<div className="container" style={{marginTop:15}}>
        <div class="row">
        <div class="col-lg-8">
                        <div class="ibox">
                            <div class="ibox-head">
                                <div class="ibox-title"><b>RFM Segmentation Description</b></div>
                            </div> 
                           <div class="ibox-body">
                                <div class="row align-items-center">
                                <div className="container" style={{overflow:'scroll', height:'420px'}}>

                                  <h5><b>What is RFM Segmentation?</b></h5>
                                  <p style={{textAlign:'justify'}}>
                                  (RFM) Recency, frequency, monetary value is a marketing analysis tool used to identify a company's or an organization's best customers by using certain measures. The RFM model is based on three quantitative factors:
                                  Recency: How recently a customer has made a purchase
                                  Frequency: How often a customer makes a purchase
                                  Monetary Value: How much money a customer spends on purchases
                                  </p> 
                                 <h5><b>What are Recency, Frequency and Monetary?</b></h5>                                 
                                  <p style={{textAlign:'justify'}}> 
                                  <br></br><h5><b>Recency:</b></h5>How much time has elapsed since a customer’s last activity or transaction with the brand? Activity is usually a purchase, although variations are sometimes used, e.g., the last visit to a website or use of a mobile app. In most cases, the more recently a customer has interacted or transacted with a brand, the more likely that customer will be responsive to communications from the brand.
                                  <br></br><br></br><h5><b>Frequency:</b></h5> How often has a customer transacted or interacted with the brand during a particular period of time? Clearly, customers with frequent activities are more engaged, and probably more loyal, than customers who rarely do so. And one-time-only customers are in a class of their own.
                                  <br></br><br></br><h5><b>Monetary:</b></h5> Also referred to as “monetary value,” this factor reflects how much a customer has spent with the brand during a particular period of time. Big spenders should usually be treated differently than customers who spend little. Looking at monetary divided by frequency indicates the average purchase amount – an important secondary factor to consider when segmenting customers.  </p>
                                  <h5><b>Customer Values?</b></h5>
                                  <p style={{textAlign:'justify'}}>
                                  <ol>
                                    <li>Low&nbsp;&nbsp;&nbsp;<span style={{backgroundColor:'rgba(0, 0, 255)',paddingLeft:'10px',borderRadius:'10px'}}>.</span></li>
                                    <li>Mid Value&nbsp;&nbsp;&nbsp;<span style={{backgroundColor:'rgba(0, 128, 0)',paddingLeft:'10px',borderRadius:'10px'}}>.</span></li>
                                    <li>High Value&nbsp;&nbsp;&nbsp;<span style={{backgroundColor:'rgba(255, 0, 0)',paddingLeft:'10px',borderRadius:'10px'}}>.</span></li>
                                  </ol>

                                  </p>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  <div class="col-lg-4">
                        <div class="ibox">
                            <div class="ibox-head">
                                <div class="ibox-title"><b>RFM Segmentation Description</b></div>
                            </div> 
                           <div class="ibox-body">
                                <div class="row align-items-center">
                                <div className="container" style={{height:'420px'}}>
                                <div style={{textAlign:'center',marginTop:20}}>
                                    <img style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:10,marginBottom:10}} src={rfm_illustration} alt="Buffering"/>
                                </div>
                                <br></br>
                                <ol>
                                    <li>Low&nbsp;&nbsp;&nbsp;<span style={{backgroundColor:'rgba(0, 0, 255)',paddingLeft:'10px',borderRadius:'10px'}}>.</span></li>
                                    <li>Mid Value&nbsp;&nbsp;&nbsp;<span style={{backgroundColor:'rgba(0, 128, 0)',paddingLeft:'10px',borderRadius:'10px'}}>.</span></li>
                                    <li>High Value&nbsp;&nbsp;&nbsp;<span style={{backgroundColor:'rgba(255, 0, 0)',paddingLeft:'10px',borderRadius:'10px'}}>.</span></li>
                                  </ol>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>     
                </div>
                </div>
</>
: ''
}



{this.state.rfm_executed?
<div>
 <div className="container">
        <div class="row">
                  <div class="col-lg-12">
                        <div class="ibox">
                            <div class="ibox-head">
                                <div class="ibox-title">RFM Segmented File Preview</div>
                            </div>
                           <div class="ibox-body">
                                <div class="row align-items-center">
                                <div className="container" style={{overflow:'scroll', height:'500px'}}>
                                <table class="table table-striped table-bordered" style={{width:"100%"}}>
                                  <thead>
                                        <tr>
                                          <td><b>Customer ID</b></td>
                                          <td><b>Recency</b></td>
                                          <td><b>RecencyCluster</b></td>
                                          <td><b>Frequency</b></td>
                                          <td><b>FrequencyCluster</b></td>
                                          <td><b>Revenue</b></td>
                                          <td><b>RevenueCluster</b></td>
                                          <td><b>OverallScore</b></td>
                                          <td><b>Segment</b></td>
                                        </tr>
                                      </thead>
                                      <tbody>
                                      {this.state.rfm_data?
                                        <>
                                        {this.state.rfm_data.slice(1).map((data,index)=>(
                                          <tr>
                                          <td>{data[1]}</td>
                                          <td>{data[2]}</td>
                                          <td>{data[3]}</td>
                                          <td>{data[4]}</td>
                                          <td>{data[5]}</td>
                                          <td>{data[6]}</td>
                                          <td>{data[7]}</td>
                                          <td>{data[8]}</td>
                                          <td>{data[9]}</td>
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
                                          <td><b>Customer ID</b></td>
                                          <td><b>Recency</b></td>
                                          <td><b>RecencyCluster</b></td>
                                          <td><b>Frequency</b></td>
                                          <td><b>FrequencyCluster</b></td>
                                          <td><b>Revenue</b></td>
                                          <td><b>RevenueCluster</b></td>
                                          <td><b>OverallScore</b></td>
                                          <td><b>Segment</b></td>
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
                                      <a class="btn btn-primary btn-sm" href={this.state.rfm_file}>Export to CSV</a>
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

export default RFM_Segmentation;