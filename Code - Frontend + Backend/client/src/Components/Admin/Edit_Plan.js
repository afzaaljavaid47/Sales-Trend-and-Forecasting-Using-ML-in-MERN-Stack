import React, { Component } from 'react'
import Menubar from './Menubar'
import Footer from './Footer'
import Setting_Menu from './Setting_Menu'
import Cookies from 'js-cookie'
import axios from 'axios'
import {Redirect,Link} from 'react-router-dom'
export default class Manage_Plans extends Component {
    state={
        redirect:null,
        pname:'',
        pprice:'',
        records:[]
    }
    delete_record=(id)=>{
        axios.post(`/delete_plan/${id}`)
        .then(response=>{
            alert(response.data.data)
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
    formSubmit=(e)=>{
        e.preventDefault();    
        fetch('/add_plan',{
            method:'post',
            body:JSON.stringify(this.state),
            headers:{
                'Content-Type':'application/json'
              }
        })
        alert('Plan Added Successfully!')
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
       <Menubar/>
       <div class="content-wrapper">
       <div class="page-content fade-in-up">
       <h2 style={{padding:"20px"}} class="text-center">All Plans Information Table</h2>
        <div className="container" style={{marginBottom:'30px'}}>
        <table style={{marginTop:"200px"}} id="example" class="table table-striped table-bordered" style={{width:"100%"}}>
        <thead>
            <tr>
            <th>Plan Name</th>
            <th>Plan Price</th>
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
                            <Link to={`/edit_plan/${data._id}`} className="btn btn-outline-primary btn-sm"><i class="fa fa-edit"></i></Link>
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
            <th>Plan Price</th>
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
