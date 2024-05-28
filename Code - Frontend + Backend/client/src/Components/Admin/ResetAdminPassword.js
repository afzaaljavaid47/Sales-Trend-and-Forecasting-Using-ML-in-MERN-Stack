import React, { Component } from 'react'
import Navbar from '../Users/Navbar'
import {Link} from 'react-router-dom'
import axios from 'axios'
import buffering from '../../images/buffering.gif';
import styles from '../../css/uploaddata.module.css';
import swal from 'sweetalert'

export default class ResetAdminPassword extends Component {
    state={
        email:'',
        buffering:false
    }
    onInputChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    formSubmit=(e)=>{
        e.preventDefault()
        this.setState({buffering:true})
        axios.post('/admin_password_reset',this.state)
        .then(data=>{
            this.setState({buffering:false})
            console.log(data.data.data)
            if(data.data.data==="error")
            {
              swal("Error!",'This email not exists in out database.', "error");
            }
            else
            {
            swal("Success!",data.data.data, "success");
            }
        })  
    }
    render() {
    return (
    <div>
      <Navbar/>
      <section style={{marginTop:'-50px',backgroundColor:'#37517e'}}>
    <div class="registration-form">
        <form onSubmit={(e)=>this.formSubmit(e)}>
        <div class="form-group" style={{textAlign:'center',color:'#37517E',paddingBottom:'20px'}}>
            <h2>Admin Reset Password Form</h2>
            <p style={{paddingLeft:'20px',paddingRight:'20px'}}>Please enter email address on which you have previledge to access admin panel of this website.</p>
            </div>
            <div class="form-group">
                <input type="email" class="form-control item" name="email" placeholder="Email" onChange={(e)=>this.onInputChange(e)} required/>
            </div>    
            <div class="form-group">
            <button class="btn btn-block create-account">Reset Now</button>
            <div style={{textAlign:'center'}}>
            {this.state.buffering?
              <img className={styles.loader} style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:10,marginBottom:10}} src={buffering} alt="Buffering"/>
              :null}
              </div>
            </div>
            <p className="text-center"> Already have an account? <Link to="/admin">Log in Now</Link></p>
        </form>
    </div>
    </section>
</div>
    )
    }
}
