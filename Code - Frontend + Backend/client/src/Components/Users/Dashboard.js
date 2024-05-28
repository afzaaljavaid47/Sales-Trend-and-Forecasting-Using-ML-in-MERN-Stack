import React, { Component } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
export default class Dashboard extends Component {
    logOut=()=>{
        Cookies.remove('token')
        this.setState({redirect:'/login'})
    }
    state={
        fname:'',
        lname:'',
        uname:'',
        email:'',
        phone:'',
        password:'',
        redirect:null
    }
    componentDidMount()
    {
        axios.get('/profile_info',{headers:{token:Cookies.get('token')}})
        .then(response=>{
            console.log(response.data.profile)
            this.setState({
                fname:response.data.profile.fname,
                lname:response.data.profile.lname,
                uname:response.data.profile.uname,
                email:response.data.profile.email,
                phone:response.data.profile.phone,
                password:response.data.profile.password
            })
        })
    }
    formSubmit=(e)=>{
        e.preventDefault();
       fetch('/update_customer',{
            method:'post',
            body:JSON.stringify(this.state),
            headers:{
                'Content-Type':'application/json',
                token:Cookies.get('token')
              }
        })
        .then(response=>{
            console.log(response.data)
        })
        alert('Customer Record Updated Successfully!')
   }
    onInputChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render() {
        if(this.state.redirect)
        {
            return <Redirect to={this.state.redirect}/>
        }
        if(!Cookies.get('token'))
        {
            this.setState({redirect:'/login'})
        }
        return (
<div>
<section style={{marginTop:'-50px',backgroundColor:'#37517e'}}>
    <div class="registration-form">
        <form onSubmit={this.formSubmit}>
        <div class="form-group" style={{textAlign:'center',color:'#37517E',paddingBottom:'20px'}}>
            <h2>Customer Information</h2>
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
                <input type="text" value={this.state.password} minlength="8" title="Minimum Length should be 8" class="form-control item" id="exampleInputPassword1" name="password" placeholder="Password" onChange={(e)=>this.onInputChange(e)} required/>
            </div>
            <div class="form-group">
            <button class="btn btn-block create-account">Update Record</button>
            <button class="btn btn-block create-account" onClick={this.logOut}>Log Out</button>
            </div>    
        </form>
    </div>
    </section>
</div>
        )
    }
}
