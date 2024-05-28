import React, { Component } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'

export default class Admin_Change_Password extends Component {
    constructor(props){
    super(props);
    this.state={
        id:'',
        password:'',
        conf_password:'',
        errors:'',
        redirect:null
        }
    }
    onInputChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    componentDidMount(){
     var id=this.props.match.params.id;
     this.setState({
         id:id
     })
     console.log(id)
    }
    
    formSubmit=(e)=>{
    e.preventDefault();
    if(this.state.password!=this.state.conf_password)
    {
        this.setState({errors:'Passwords not matched'})
    }
    else
    {
    axios.post('/update_admin_reset_password',this.state)
    .then(responce=>
    {
    alert(responce.data.data)
    Cookies.set('adtoken', responce.data.tokens,{ expires: 7 })
    this.setState({redirect:"/admin_panel"})
    })
      }
    }

    render() {
        if(this.state.redirect)
        {
            return <Redirect to={this.state.redirect}/>
        }
    return (
    <div>
    <section style={{marginTop:'-50px',backgroundColor:'#37517e'}}>
    <div class="registration-form" style={{padding:'70px'}}>
        <form onSubmit={(e)=>this.formSubmit(e)}>
        <div class="form-group" style={{textAlign:'center',color:'#37517E',paddingBottom:'20px'}}>
            <h2>Admin Reset Password Form</h2>
            </div>
            <div style={{paddingLeft:'120px'}}>
            <div class="form-group">
                <input type="password" class="form-control item" name="password" placeholder="Password" onChange={(e)=>this.onInputChange(e)} required/>
            </div>
            <div class="form-group">
                <input type="password" class="form-control item" name="conf_password" placeholder="Repaet Password" onChange={(e)=>this.onInputChange(e)} required/>
            </div>      
            {
            this.state.errors? 
            <center><strong style={{color:'red'}}>{this.state.errors} ! Try again </strong>   
            </center>:null
            }
            <div class="form-group">
            <button class="btn btn-block create-account">Reset Now</button>
            </div>
           <p className="text-center"> I know my password? <Link to="/admin">Login Now</Link></p>
            </div>
        </form>
    </div>
    </section>
</div>
    )
    }
}
