import React, { Component } from 'react'
import Menubar from './Menubar'
import Footer from './Footer'
import Setting_Menu from './Setting_Menu'
import Cookies from 'js-cookie'
import {Modal,Button} from 'react-bootstrap'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import swal from 'sweetalert'
export default class Manage_Plans extends Component {
    state={
        redirect:null,
        pname:'',
        pprice:'',
        records:[],
        show:false,
        id:null,
        ppname:'',
        ppprice:''
    }
    handleClose = () =>{
        this.setState({show:false})
    };
    handleShow = (id) => {
        this.setState({show:true,id:id})
        this.get_update_data(id)
    };
    get_update_data(id)
    {
        axios.get(`/get_plan_data/${id}`)
        .then(res=>{
            console.log(res.data);
            this.setState({
                ppname:res.data.pname,
                ppprice:res.data.pprice
            })
        })   
    }
    delete_record=(id)=>{
        axios.post(`/delete_plan/${id}`)
        .then(response=>{
            swal("Success!",'Plan Deleted Successfully !' , "success");
            this.getdata();
        })
    }
    componentDidMount()
    {
        this.getdata();
    }
    getdata()
    {
        axios.get('/all_plans_info')
        .then(responce=>{
            this.setState({records:responce.data});
        })
    }
    reset_form=()=>{
        this.setState({
        pname:'',
        pprice:''
        })
    }
    formUpdateSubmit=(e)=>{
        e.preventDefault();    
        fetch('/update_plan',{
            method:'post',
            body:JSON.stringify(this.state),
            headers:{
                'Content-Type':'application/json'
              }
        })
        .then(res=>console.log(res))
        swal("Success!", "Plan Updated Successfully!!", "success");
        this.getdata();
        this.handleClose();
    }
    formSubmit=(e)=>{
        e.preventDefault();    
        fetch('/add_plan',{
            method:'post',
            body:JSON.stringify(this.state),
            headers:{
                'Content-Type':'application/json'
              }
        })
        swal("Success!", "Plan Inserted Successfully!!", "success");
        this.reset_form(); 
        this.getdata();     
    }
    onInputChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render() {
        if(!Cookies.get('adtoken'))
        {
            this.setState({redirect:'/admin'})
        }
        if(this.state.redirect)
        {
            return <Redirect to="admin"/>
        }
  return (
    <>
    <body class="fixed-navbar">
      <div class="page-wrapper">
       <Menubar name="MPL"/>
       <div class="content-wrapper">
       <div class="page-content fade-in-up">
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Plan Record</Modal.Title>
        </Modal.Header>
  <Modal.Body>
  <form onSubmit={this.formUpdateSubmit}>
            <div class="form-group">
                <label>Plan Name</label>
                <input type="text" value={this.state.ppname} class="form-control item" name="ppname" onChange={(e)=>this.onInputChange(e)}/>
            </div>
            <div class="form-group">
                <label>Plan Price ($0.00)</label>
                <input type="text" value={this.state.ppprice} pattern='^[0-9.]+$' class="form-control item" name="ppprice" title="Plan Price Should be in integer and not contain ant le" placeholder="Plan Price" onChange={(e)=>this.onInputChange(e)} required/>
             </div> 
             <div class="form-group">
            <button class="btn btn-block btn-outline-primary">Update Plan</button>
        </div>     
     </form>
      </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
       <h2 style={{padding:"20px"}} class="text-center">All Plans Information Table</h2>
        <div className="container" style={{marginBottom:'30px'}}>
        <table style={{marginTop:"200px"}} class="table table-striped table-bordered" style={{width:"100%"}}>
        <thead>
            <tr>
            <th>Plan Name</th>
            <th>Plan Price ($)</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {this.state.records.map((data,index)=>(
               <tr>
                   <td>{data.pname}</td>
                   <td>{data.pprice}</td>
                    <td>
                 <button onClick={()=>this.handleShow(data._id)} className="btn btn-outline-primary btn-sm"><i class="fa fa-edit"></i></button>
                   </td>
                   <td>
                     <button onClick={()=>this.delete_record(data._id)} className="btn btn-sm btn-outline-danger"><i class="fa fa-trash"></i></button>
                   </td>
            </tr>
        ))}
        </tbody>
        <tfoot>
            <tr>
            <th>Plan Name</th>
            <th>Plan Price ($)</th>
            <th>Edit</th>
            <th>Delete</th>
            </tr>
        </tfoot>
    </table>
    </div>
       <div class="registration-form">
        <div className="container">
        <form onSubmit={this.formSubmit}>
        <div class="form-group" style={{textAlign:'center',color:'#37517E',paddingBottom:'20px'}}>
        <h2 style={{padding:"0px"}} class="text-center">Add a New Plan Form</h2>
            </div>
            <div class="form-group">
                <label>Plan Name</label>
                <input type="text" value={this.state.pname} class="form-control item" name="pname" placeholder="Plan Name" onChange={(e)=>this.onInputChange(e)} required/>
            </div>
            <div class="form-group">
                <label>Plan Price ($0.00)</label>
                <input type="text" value={this.state.pprice} pattern='^[0-9.]+$' class="form-control item" name="pprice" title="Plan Price Should be in integer and not contain ant le" placeholder="Plan Price" onChange={(e)=>this.onInputChange(e)} required/>
             </div>   
            <div class="form-group">
            <button class="btn btn-block btn-outline-primary">Add Plan</button>
        </div>    
     </form>
     </div>
     </div>
    </div>
    <Footer/>
    </div>
    </div>
    <Setting_Menu/>
    </body>
    </>
    )
  }
}
