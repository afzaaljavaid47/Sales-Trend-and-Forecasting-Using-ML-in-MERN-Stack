import React, { Component } from 'react'
import Navbar from '../Users/Navbar'
import axios from 'axios'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'

export default class Login extends Component {
    state={
        email:'',
        password:'',
        errors:'',
        redirect:null
    }
    onInputChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    formSubmit=(e)=>{
        e.preventDefault();
        axios.post('/admin_login',this.state)
        .then(responce=>{
            if(responce.data.error==undefined)
            {
               console.log("Success!");
               Cookies.set('adtoken', responce.data.tokens,{ expires: 7 })
               this.setState({redirect:"/admin_panel"})
            }
            else
            {
                console.log(responce.data);
                this.setState({errors:responce.data.error})
            }
        })
    }
    render() {
        if(this.state.redirect)
        {
            return <Redirect to={this.state.redirect}/>
        }
    return (
    <div>
      <Navbar/>
      <section style={{marginTop:'-50px',backgroundColor:'#37517e'}}>
    <div class="registration-form">
        <form onSubmit={(e)=>this.formSubmit(e)}>
        <div class="form-group" style={{textAlign:'center',color:'#37517E',paddingBottom:'20px'}}>
            <h2>Admin Log in Form</h2>
            </div>
            <div class="form-group">
                <input type="email" class="form-control item" name="email" placeholder="Email" onChange={(e)=>this.onInputChange(e)} required/>
            </div>
            <div class="form-group">
                <input type="password" class="form-control item" name="password" placeholder="Password" onChange={(e)=>this.onInputChange(e)} required/>
            </div>      
            {
            this.state.errors? 
            <center><strong style={{color:'red'}}>{this.state.errors} ! Try again </strong>   
            </center>:null
            }
            <div class="form-group">
            <button class="btn btn-block create-account">Log in Now</button>
            </div>
           <p className="text-center"> Forgotton your password? <Link to="/reset_admin_password">Reset Now</Link></p>
        </form>
    </div>
    </section>
</div>
    )
    }
}
