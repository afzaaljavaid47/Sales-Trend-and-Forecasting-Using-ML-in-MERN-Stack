import React, { Component } from 'react';
import styles from '../../../css/uploaddata.module.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import Sample_File from '.././Sample_File1.csv'
import Menubar from '.././Menubar'
import Footer from '.././Footer'
import Setting_Menu from '.././Setting_Menu'
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'
import buffering from '../../../images/buffering.gif';
import buffering1 from '../../../images/mrm-illustration.svg';
import swal from 'sweetalert'
import Skeleton from 'react-loading-skeleton';

export default class Churn_Analysis extends Component {
  constructor(props){
    super(props)
    this.state = {
        selectedFile: null,
        uploaded: 0,
        buffering: false,
        file:'',
        analysis_file:null,
        running:false,
        result:null,
        table_data:null,
        err:null,
        err1:null,
        err2:null,
        err3:null,
        err4:null,
        err5:null,
        err6:null,
        err7:null,
        err8:null,
        mat1:null,
        mat2:null,
        accuracy:null,
        precision:null,
        recall:null,
        fp:null,
        fs:null
    }
}
churn_analysis=()=>{
  this.setState({
    running:true
  })
  axios.get('/prediction/churn',{headers: {token: Cookies.get('token')}})
  .then(response=>{
      console.log(response)
      this.setState({
      result:response.data.mat1,
      analysis_file:response.data.file,
      running:false,
      err:response.data.err,
      err1:response.data.err1,
      err2:response.data.err2,
      err3:response.data.err3,
      err4:response.data.err4,
      err5:response.data.err5,
      err6:response.data.err6,
      err7:response.data.err7,
      err8:response.data.err8,
      mat2:response.data.mat2,
      accuracy:response.data.accuracy,
      precision:response.data.precision,
      recall:response.data.recall,
      fp:response.data.fp,
      fs:response.data.fs
      }); 
      this.get_Predicted_Preview_Data()       
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
    axios.post('/upload_data_churn',form, {headers: {token: Cookies.get('token')}}, {
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
        this.churn_analysis()
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
get_Predicted_Preview_Data(){
  axios.get('/prediction/churn/preview_data',{headers: {token: Cookies.get('token')}})
    .then(response=>{
        console.log(response.data.data)
        this.setState({
            table_data:response.data.data
        });    
    });
}
componentDidMount(){
    axios.get('/check_is_upload_churn',{headers: {token: Cookies.get('token')}})
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
    <Menubar name="CHURN"/>
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
    <button className={'btn btn-success btn-lg'} onClick={this.churn_analysis}>Run Churn Analysis</button>
    </>}

  </div>
  </div>
  <div className={'col-2'}></div>
  </div>
  <div>
{this.state.running?
<>
<div style={{textAlign:'center',marginTop:20}}>
<h3 class="text-danger" style={{textAlign:'center',marginTop:15}}>Churn Analysis Running Please Wait..... </h3>
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
<div class="ibox-title"><b style={{fontSize:'18px'}}>What is Churn Analysis?</b></div>
</div>
<div class="ibox-body">
<div class="row align-items-center">
<div className="container">
<div className={'row'}>
<div class="row" style={{marginTop:10}}>      
          <div class="col-md-5">
            <img style={{marginTop:30}} src={buffering1} alt="Churn Analysis"/>
          </div>
          <div class="col-md-7">
            <p style={{textAlign:'justify'}}>
            <b>Churn analysis</b> is the evaluation of a company's customer loss rate in order to reduce it. Also referred to as customer attrition rate, churn can be minimized by assessing your product and how people use it.
            </p>
            <h5><b>Types of Customer Churn</b></h5>
              <li><b>Contractual Churn</b></li>
              <p>When a customer is under a contract for a service and decides to cancel the service e.g. Cable TV, SaaS.</p>
              <li><b>Voluntary Churn</b></li>
              <p>When a user voluntarily cancels a service e.g. Cellular connection.</p>
              <li><b>Non-Contractual Churn</b></li>
              <p>When a customer is not under a contract for a service and decides to cancel the service e.g. Consumer Loyalty in retail stores.</p>
              <li><b>Involuntary Churn</b></li>
              <p>When a churn occurs without any request of the customer e.g. Credit card expiration. </p>
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
<div className="container">
<div class="row">
<div class="col-lg-12">
<div class="ibox">
<div class="ibox-head">
<div class="ibox-title">
  <b style={{fontSize:'19px'}} class="text-success">Churn Analysis Executed Successfully !</b>
</div>
</div>
<div class="ibox-body">
<div class="row align-items-center">
<div className="container">
<div className={'row'}>
<div class="row" style={{paddingRight:20}}> 
<ol>
  <li><h5><b>Confusion Metrix</b> </h5></li>
  <p style={{fontSize:'15px'}}>
  A Confusion matrix is an N x N matrix used for evaluating the <b>performance</b> of a <b>classification model</b>, where N is the number of target classes. The matrix compares the actual target values with those predicted by the machine learning model.
  </p>
  <table className="table bordered table-striped">
    <tr>
        <td><b>Confusion Matrix</b></td>
        <td><b>Positive Negative</b></td>
    </tr>
    <tr>
    <td><b>Positive</b></td>
    <td> {this.state.result}</td>
    </tr>
    <tr>
    <td><b>Negative</b></td>
    <td>{this.state.mat2}</td>
    </tr>
  </table>
<br></br>
  <li><h5><b>Recall for the test data</b> </h5></li>
  <p style={{fontSize:'15px'}}>
    The recall is the ratio tp / (tp + fn) where tp is the number of true positives and fn the number of false negatives. The recall is intuitively the ability of the classifier to find all the positive samples.
  <br></br> Recall : <b>{this.state.recall} %</b>
  </p>
  <li><h5><b>Accuracy for the test data </b></h5></li>
  <p style={{fontSize:'15px'}}>
  Accuracy is the number of correctly predicted data points out of all the data points. More formally, it is defined as the number of true positives and true negatives divided by the number of true positives, true negatives, false positives, and false negatives.
  <br></br> Accuracy : <b>{this.state.accuracy} %</b> 
  </p>
  <li><h5><b>Precision for the test data </b></h5></li>
  <p style={{fontSize:'15px'}}>Also called Positive predictive value. The ratio of correct positive predictions to the total predicted positives. Recall — Also called Sensitivity, Probability of Detection, True Positive Rate.
  <br></br>
  Precision : <b>{this.state.precision} %</b>
  </p>
  <li><h5><b>The False positive rate of test data </b></h5></li>
  <p style={{fontSize:'15px'}}>
  A False Positive Rate is an accuracy metric that can be measured on a subset of machine learning models.
  <br></br>
  FP Rate : <b>{this.state.fp} %</b>
  </p>
  <li><h5><b>F score for the test data </b></h5></li>
  <p style={{fontSize:'15px'}}>
  The F-score, also called the F1-score, is a measure of a model's accuracy on a dataset. The F-score is commonly used for evaluating information retrieval systems such as search engines, and also for many kinds of machine learning models, in particular in natural language processing.
  <br></br>
  F-Score : <b>{this.state.fs} %</b>
  </p>  
</ol>

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
                  <div class="col-lg-7">
                        <div class="ibox">
                            <div class="ibox-head">
                                <div class="ibox-title"><b>Churn Analysis File Preview</b></div>
                            </div> 
                           <div class="ibox-body">
                                <div class="row align-items-center">
                                <div className="container" style={{overflow:'scroll', height:'380px'}}> 
                                <table class="table table-striped table-bordered" style={{width:"100%"}}>
                                  <thead>
                                        <tr>
                                          <td><b>ID</b></td>
                                          <td><b>Customer ID</b></td>
                                          <td><b>Churn</b></td>
                                        </tr>
                                      </thead>
                                      <tbody>
                                      {this.state.table_data?
                                        <>
                                        {this.state.table_data.slice(1).map((data,index)=>(
                                          <tr>
                                          <td>{++index}</td>
                                          <td>{data[0]}</td>
                                          <td>{data[1]}</td>
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
                                          <td><b>Customer ID</b></td>
                                          <td><b>Churn</b></td>
                                      </tr>
                                      </tfoot>
                                    </table>
                                </div>
                                </div>
                                <div class="row">
                                <div class="col-md-6">
                                  <br></br>
                                <h5 class="text-danger">
                                  <b></b>
                                </h5>
                                  </div>
                                  <div class="col-md-6">
                                  <div style={{display: 'flex', justifyContent: 'flex-end',textAlign:'right'}}>
                                      <a class="btn btn-primary btn-sm" href={this.state.analysis_file}>Export to CSV</a>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>     
                    <div class="col-lg-5">
                        <div class="ibox">
                            <div class="ibox-head">
                                <div class="ibox-title"><b>Warnings During Running Churn Analysis</b></div>
                            </div>
                           <div class="ibox-body">
                            <div class="row align-items-center">
                            <div className="container">
                            <marquee width="100%" direction="up" height="420px" scrollamount="3">
                            <p class="text-danger">
                             <p>{this.state.err}</p>
                             <p>{this.state.err1}</p>
                             <p>{this.state.err2}</p>
                             <p>{this.state.err3}</p>
                             <p>{this.state.err4}</p>
                             <p>{this.state.err5}</p>
                             <p>{this.state.err6}</p>
                             <p>{this.state.err7}</p>
                             <p>{this.state.err8}</p>
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
Key error: "None of [Index(['customerid', 'churn'], dtype='object')] are in the [columns]"
</h5>
<h4>Note : </h4>
<h5 class="text-center">['customerid', 'churn'] must be present in .csv file to run thius prediction successfully !</h5>
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