import React, { Component } from 'react';
import styles from '../../css/uploaddata.module.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import Sample_File from './Sample_File.csv'
import Menubar from './Menubar'
import Footer from './Footer'
import Setting_Menu from './Setting_Menu'
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'
import buffering from '../../images/buffering.gif';
import swal from 'sweetalert'
import DataTable from 'react-data-table-component';
import * as XLSX from 'xlsx';

class Upload_Data extends Component {
  constructor(props){
    super(props)
    this.state = {
        selectedFile: null,
        uploaded: 0,
        buffering: false,
        file:''
    }
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
    axios.post('/upload_data',form, {headers: {token: Cookies.get('token')}}, {
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
    axios.get('/check_is_upload',{headers: {token: Cookies.get('token')}})
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
    <Menubar name="UD"/>
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
  </form>
  <div class="card-footer">
  <button type="submit" className={'btn btn-primary btn-lg'} onClick={this.onClickHandler}>Upload Data</button>
  {
  this.state.buffering?  
  <img className={styles.loader} src={buffering} alt="Buffering"/>:null
  }
   { this.state.uploaded == true &&<>
                    <div className="alert alert-success mt-4" role="alert">
                        <span style={{fontSize:17}}>We have already store your data</span>                  
                        <a href={this.state.file} className={'btn btn-primary btn-sm'} >Download Data</a>
                        <a href='/preview_data' className={'btn btn-primary btn-sm'} >Preview Data</a></div>
                    </>}
  </div>
  </div>
  </div>
  <div className={'col-2'}></div>
  </div>

  <div className="container" style={{marginTop:30}}>
<div class="row">
<div class="col-lg-12">
<div class="ibox">
<div class="ibox-head">
<div class="ibox-title"><b style={{fontSize:'18px'}}>Data Description</b></div>
</div>
<div class="ibox-body">
<div class="row align-items-center">
<div className="container">
<div className={'row'} style={{marginTop:'5px'}}>
  <div className={'col-1'}></div>
  <div className={'col-10'}>
  <ul class="list-group">
  <li class="list-group-item list-group-item-info">
  <b style={{fontSize:'16px'}}>What should be include in data?</b>
  </li>
  <li class="list-group-item list-group-item-primary">
    We need certain columns from you in order to apply 
    our algorithms. We require a data file containing atleast
    these following columns.   <br></br> 
    <ol>
      <li>Invoiceno</li>
      <li>Description</li>
      <li>Quantity</li>
      <li>Invoicedate</li>
      <li>CustomerID</li>
      <li>Unitprice</li>
      <li>Country</li>
    </ol>
    <div className="alert alert-success mt-4">
        <span style={{fontSize:16}}>Download Sample File</span>
        <a href={Sample_File} className={'btn btn-primary btn-sm'} >Download</a>
    </div>
  </li>
    
  <li class="list-group-item list-group-item-info" style={{marginTop:'10px'}}>
  <b style={{fontSize:'16px'}}>Why do I need to Upload my Data? </b>
  </li>
  <li class="list-group-item list-group-item-primary">
  In order to examine and make predictions about your 
  store, we need data containing certain columns mentioned 
  above. With our Automated Analyzing System, we show you 
  results based on the data you provide here.             
  </li>
  <li class="list-group-item list-group-item-info" style={{marginTop:'10px'}}>
  <b style={{fontSize:'16px'}}>Data Privacy</b>
  </li>
  <li class="list-group-item list-group-item-primary">
  Our Security Policy strictly adhere us NOT to share your data with anyone.             
  </li>
</ul> 
<div className={'col-1'}></div>                   
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
 
<Footer/>
</div>
</div>
<Setting_Menu/>
</div>
</body>
    );
  };
}
export default Upload_Data;