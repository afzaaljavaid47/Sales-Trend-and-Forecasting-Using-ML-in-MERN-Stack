import React, { Component } from 'react';
import styles from '../../css/uploaddata.module.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import Menubar from './Menubar'
import Footer from './Footer'
import Setting_Menu from './Setting_Menu'
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'
import buffering from '../../images/buffering.gif';
import DataTable from 'react-data-table-component';
import * as XLSX from 'xlsx';

class Preview_Data extends Component {
  constructor(props){
    super(props)
    this.state = {
        uploaded: 0,
        buffering: false,
        file:'',
        data:null
    }
  }
get_Data(){
  axios.get('/preview_data',{headers: {token: Cookies.get('token')}})
    .then(response=>{
        console.log(response.data.data)
        this.setState({
            data:response.data.data
        });    
    });
}
componentDidMount(){
  this.get_Data();
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
    <Menubar name="PRE"/>
  <div class="content-wrapper">
  <div class="page-content fade-in-up">
        <h1 style={{textAlign:'center'}}>Your Uploaded Data Preview</h1>
        {this.state.uploaded?
        <>
        <div style={{textAlign:'center',marginTop:20,marginBottom:20}}>
        <a class="text-center btn btn-primary" href={this.state.file}>Download Uploaded Data</a>
        </div>
        <div className="container" style={{overflow:'scroll', height:'800px',marginBottom:'30px'}}>
        {this.state.data?
        <>
        <table style={{marginTop:"200px"}} class="table table-striped table-bordered table-responsive" style={{width:"100%"}}>
        <thead>
            <tr>
                <th>ID</th>
                <th>InvoiceNo</th>
                <th>StockCode</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>InvoiceDate</th>
                <th>UnitPrice</th>
                <th>CustomerID</th>
                <th>Country</th>
            </tr>
        </thead>
        <tbody>
        
        {this.state.data.slice(1).map((data,index)=>(
                    <tr>
                        <td>{index}</td>
                        <td>{data[0]}</td>
                        <td>{data[2]}</td>
                        <td>{data[3]}</td>
                        <td>{data[4]}</td>
                        <td>{data[5]}</td>
                        <td>{data[6]}</td>
                        <td>{data[7]}</td>
                        <td>{data[8]}</td>
                    </tr>
        ))}

        </tbody>
        <tfoot>
            <tr>
                <th>ID</th>
                <th>InvoiceNo</th>
                <th>StockCode</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>InvoiceDate</th>
                <th>UnitPrice</th>
                <th>CustomerID</th>
                <th>Country</th>
           </tr>
        </tfoot>
    </table>
    </>
      :
      <>
      <div style={{textAlign:'center',marginTop:20,marginBottom:20}}>
      <h4>Loading Data Please Wait</h4><br></br><img src={buffering} alt=""/>  
      </div>
      </>
       }
    </div>
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
<Footer/>
</div>
</div>
<Setting_Menu/>
</div>
</body>
    );
  };
}
export default Preview_Data;