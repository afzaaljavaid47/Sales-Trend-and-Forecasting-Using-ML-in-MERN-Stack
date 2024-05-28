import React, { Component } from 'react'
import axios from 'axios'
import Menubar from './Menubar'
import Footer from './Footer'
import {Modal,Button} from 'react-bootstrap'
import Setting_Menu from './Setting_Menu'
import Cookies from 'js-cookie'
import swal from 'sweetalert'
import {Redirect} from 'react-router-dom'
export default class Manage_Customers extends Component {
    state={
        records:[],
        redirect:null,
        fname:'',
        lname:'',
        uname:'',
        email:'',
        phone:'',
        password:'',
        ufname:'',
        ulname:'',
        uuname:'',
        uemail:'',
        uphone:'',
        upassword:'',
        id:null
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
        axios.get(`/get_customer_data/${id}`)
        .then(res=>{
            console.log(res.data);
            this.setState({
        ufname:res.data.fname,
        ulname:res.data.lname,
        uuname:res.data.uname,
        uemail:res.data.email,
        uphone:res.data.phone,
        upassword:res.data.password,
            })
        })   
    }
    formUpdateSubmit=(e)=>{
        e.preventDefault();    
        fetch('/update_customer',{
            method:'post',
            body:JSON.stringify(this.state),
            headers:{
                'Content-Type':'application/json'
              }
        })
        .then(res=>console.log(res))
        swal("Success!", "Customer Updated Successfully!!", "success");
        this.getdata();
        this.handleClose();
    }
    componentDidMount()
    {
        this.getdata();
    }
    getdata()
    {
        axios.get('/all_custumers_info')
        .then(responce=>{
            this.setState({records:responce.data});
        })
    }
    onInputChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    formSubmit=(e)=>{
        e.preventDefault();
    fetch('/registration',{
            method:'post',
            body:JSON.stringify(this.state),
            headers:{
                'Content-Type':'application/json'
              }
        })
        swal("Success!", "Customer Register Successfully!", "success");
        this.reset_form();      
        this.getdata();
    }
    reset_form=()=>{
        this.setState({
        fname:'',
        lname:'',
        uname:'',
        email:'',
        phone:'',
        password:'',
        confirm_password:''
        })
    }
    delete_record=(id)=>{
        axios.post(`/delete_customer/${id}`)
        .then(response=>{
            swal("Success!", "Customer Deleted Successfully!", "success");
            this.getdata();
        })
    }
    render() {
        if(!Cookies.get('adtoken'))
        {
            this.setState({redirect:'/admin'})
        }
        if(this.state.redirect)
        {
            return <Redirect to="/admin"/>
        }
return (
<body class="fixed-navbar">
    <div class="page-wrapper">
    <Menubar name="MC"/>
        <div class="content-wrapper">
        <div class="page-content fade-in-up">
<Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Customer Record</Modal.Title>
        </Modal.Header>
  <Modal.Body>
  <form onSubmit={this.formUpdateSubmit}>
            <div class="form-group">
                <label>First Name</label>
                <input type="text" value={this.state.ufname} pattern='^[a-zA-Z]+(\s)*[a-zA-Z]*$' class="form-control item" minLength="3" title="First Name Should be at least three characters long and contains only characters" name="ufname" placeholder="First Name"  onChange={(e)=>this.onInputChange(e)} required/>
            </div>
            <div class="form-group">
            <label>Last Name</label>
                <input type="text" value={this.state.ulname} pattern='^[a-zA-Z]+(\s)*[a-zA-Z]*$' class="form-control item" name="ulname" minLength="3" title="Last Name Should be at least three characters long and contains only characters" placeholder="Last Name" onChange={(e)=>this.onInputChange(e)} required/>
            </div>
            <div class="form-group">
            <label>User Name</label>
                <input type="text" value={this.state.uuname} pattern='^[a-zA-Z1-9]+$' class="form-control item" name="uuname" minLength="6" title="Username Name Should be at least six characters long and not contain ant space" placeholder="User Name" onChange={(e)=>this.onInputChange(e)} required/>
            </div>
            <div class="form-group">
            <label>E-Mail</label>
                <input type="email" disabled value={this.state.uemail} class="form-control item" name="uemail" placeholder="Email" onChange={(e)=>this.onInputChange(e)} required/>
            </div>
            <div class="form-group">
            <label>Phone</label>
                <input type="text" value={this.state.uphone} pattern='^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$' title="Phone Number should be +92-349-7462877 in this format" class="form-control item" name="uphone" placeholder="Phone Number" onChange={(e)=>this.onInputChange(e)} required/>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="text" value={this.state.upassword} minlength="8" title="Minimum Length should be 8" class="form-control item" id="exampleInputPassword1" name="upassword" placeholder="Password" onChange={(e)=>this.onInputChange(e)} required/>
            </div>  
            <div class="form-group">
            <button class="btn btn-block btn-outline-primary">Update Customer</button>
               </div>    
          </form>
      </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        <h2 style={{padding:"20px"}} class="text-center">All Customers Information Table</h2>
        <div className="container" style={{marginBottom:'30px'}}>
        <table style={{marginTop:"200px"}} class="table table-striped table-bordered" style={{width:"100%"}}>
        <thead>
            <tr>
            <th>First Name</th>
            <th>Last Name</th>
                <th>User Name</th>
                <th>E-Mail</th>
                <th>Phone No.</th>
                <th>Password</th>
                <th>Category</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
        
        {this.state.records.map((data,index)=>(
                    <tr>
                        <td>{data.fname}</td>
                        <td>{data.lname}</td>
                        <td>{data.uname}</td>
                        <td>{data.email}</td>
                        <td>{data.phone}</td>
                        <td>{data.password}</td>
                        <td>{data.category}</td>
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
            <th>First Name</th>
            <th>Last Name</th>
            <th>User Name</th>
            <th>E-Mail</th>
            <th>Phone No.</th>
            <th>Password</th>
            <th>Category</th>
            <th>Edit</th>
            <th>Delete</th>
            </tr>
        </tfoot>
    </table>        
    </div>
        </div>
        <div class="registration-form">
        <form onSubmit={this.formSubmit}>
        <div class="form-group" style={{textAlign:'center',color:'#37517E',paddingBottom:'20px'}}>
            <h2>Add New Customer Form</h2>
            </div>
            <div class="form-group">
                <input type="text" value={this.state.fname} pattern='^[a-zA-Z]+(\s)*[a-zA-Z]*$' class="form-control item" minLength="3" title="First Name Should be at least three characters long" name="fname" placeholder="First Name"  onChange={(e)=>this.onInputChange(e)} required/>
            </div>
            <div class="form-group">
                <input type="text" value={this.state.lname} pattern='^[a-zA-Z]+(\s)*[a-zA-Z]*$' class="form-control item" name="lname" minLength="3" title="Last Name Should be at least three characters long" placeholder="Last Name" onChange={(e)=>this.onInputChange(e)} required/>
            </div>
            <div class="form-group">
                <input type="text" value={this.state.uname} pattern='^[a-zA-Z1-9]+$' class="form-control item" name="uname" minLength="6" title="Username Name Should be at least six characters long and not contain ant space" placeholder="User Name" onChange={(e)=>this.onInputChange(e)} required/>
            </div>
            <div class="form-group">
                <input type="email" value={this.state.email} class="form-control item" name="email" placeholder="Email" onChange={(e)=>this.onInputChange(e)} required/>
            </div>
            <div class="form-group">
                <input type="text" value={this.state.phone} pattern='^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$' title="Phone Number should be +92-349-7462877 in this format" class="form-control item" name="phone" placeholder="Phone Number" onChange={(e)=>this.onInputChange(e)} required/>
            </div>
            <div class="form-group">
                <input type="password" value={this.state.password} minlength="8" title="Minimum Length should be 8" class="form-control item" id="exampleInputPassword1" name="password" placeholder="Password" onChange={(e)=>this.onInputChange(e)} required/>
            </div>   
            <div class="form-group">
            <button class="btn btn-block create-account">Add Customer</button>
               </div>    
          </form>
    </div>
           <Footer/>
        </div>
    </div>
    <Setting_Menu/>
</body>
        )
    }
}
