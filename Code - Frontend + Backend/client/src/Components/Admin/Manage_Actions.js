import React, { Component } from 'react'
import Menubar from './Menubar'
import Footer from './Footer'
import Setting_Menu from './Setting_Menu'
import Cookies from 'js-cookie'
import {Modal,Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import swal from 'sweetalert'
import axios from 'axios'
export default class Manage_Actions extends Component {
    state={
        redirect:null,
        aname:'',
        aplan:'',
        records:[],
        plans:[],
        id:null,
        aaname:'',
        aaplan:'',
        show:false
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
        axios.get(`/get_action_data/${id}`)
        .then(res=>{
            console.log(res.data);
            this.setState({
                aaname:res.data.aname,
                aaplan:res.data.aplan
            })
        })   
    }
    onInputChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    componentDidMount(){
        this.get_Plans();
        this.getdata();
    }
    delete_record=(id)=>{
        axios.post(`/delete_action/${id}`)
        .then(response=>{
            swal("Success!",'Action Deleted Successfully !' , "success");
            this.getdata();
        })
    }
    getdata()
    {
        axios.get('/all_actions_info')
        .then(responce=>{
            console.log(responce.data)
            this.setState({records:responce.data});
        })
    }
    get_Plans(){
        axios.get('/get_all_plans')
        .then(res=>{
            console.log(res.data)
            this.setState({plans:res.data})
        })
    }
    reset_form=()=>{
        this.setState({
        aname:'',
        })
    }
    formSubmit=(e)=>{
        e.preventDefault();    
        fetch('/add_action',{
            method:'post',
            body:JSON.stringify(this.state),
            headers:{
                'Content-Type':'application/json'
              }
        })
        swal("Success!", "Action Inserted Successfully!", "success");
        this.reset_form(); 
        this.getdata();
    }
    formUpdateSubmit=(e)=>{
        e.preventDefault();    
        fetch('/update_action',{
            method:'post',
            body:JSON.stringify(this.state),
            headers:{
                'Content-Type':'application/json'
              }
        })
        .then(res=>console.log(res))
        swal("Success!", "Action Updated Successfully!!", "success");
        this.getdata();
        this.handleClose();
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
       <Menubar name="MA"/>
       <div class="content-wrapper">
       <div class="page-content fade-in-up">
       <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Action Record</Modal.Title>
        </Modal.Header>
  <Modal.Body>
  <form onSubmit={this.formUpdateSubmit}>
            <div class="form-group">
                <label>Action Name</label>
                <input type="text" value={this.state.aaname} class="form-control item" name="aaname" onChange={(e)=>this.onInputChange(e)}/>
            </div>
            <div class="form-group">
                <label>Action Price ($)</label>
                <select name="aaplan" value={this.state.aaplan} class="form-control item" required onChange={(e)=>this.onInputChange(e)}>
                <option>Choose Pricing Plan</option>
                {this.state.plans.map((data)=>(
                    <option value={data.pname}>{data.pname} ($ {data.pprice})</option>
                ))}
                </select> </div> 
             <div class="form-group">
            <button class="btn btn-block btn-outline-primary">Update Action</button>
        </div>     
     </form>
      </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      
       <h2 style={{padding:"20px"}} class="text-center">All Actions Information Table</h2>
        <div className="container" style={{marginBottom:'30px'}}>
        <table style={{marginTop:"200px"}} class="table table-striped table-bordered" style={{width:"100%"}}>
        <thead>
            <tr>
            <th>Action Name</th>
            <th>Ation Plan</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        
        {this.state.records.map((data,index)=>(
                    <tr>
                         <td>{data.aname}</td>
                         <td>{data.aplan}</td>
                        <td>
                        <button onClick={()=>this.handleShow(data._id)} className="btn btn-outline-primary btn-sm"><i class="fa fa-edit"></i></button> </td>
                            <td>
                               <button onClick={()=>this.delete_record(data._id)} className="btn btn-sm btn-outline-danger"><i class="fa fa-trash"></i></button>
                               </td>
                    </tr>
        ))}

        </tbody>
        <tfoot>
            <tr>
            <th>Action Name</th>
            <th>Ation Plan</th>
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
        <h2 style={{padding:"0px"}} class="text-center">Add New Action Form</h2>
            </div>
            <div class="form-group">
                <label>Action Name (Prediction Name)</label>
                <input required type="text" value={this.state.aname} class="form-control item" name="aname" placeholder="Action Name" onChange={(e)=>this.onInputChange(e)} required/>
            </div>
            <div class="form-group">
                <label>Action Plan (Prediction Price)</label>
                <select name="aplan" class="form-control item" required onChange={(e)=>this.onInputChange(e)}>
                <option>Choose Pricing Plan</option>
                {this.state.plans.map((data)=>(
                    <option value={data.pname}>{data.pname} ($ {data.pprice})</option>
                ))}
                </select>
            </div>   
            <div class="form-group">
            <button class="btn btn-block btn-outline-primary">Add Action</button>
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
