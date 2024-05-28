import React, { Component } from 'react'
import Menubar from './Menubar'
import Footer from './Footer'
import {Modal} from 'react-bootstrap'
import axios from 'axios'
import Setting_Menu from './Setting_Menu'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import swal from 'sweetalert'
export default class User_Manage_Packages extends Component {
    state={
        redirect:null,
        plans:[],
        card_number:'',
        expiry:'',
        cvv:'',
        amount:'',
        related_data:[],
        all_actions_data:[],
        category:null,
        cat:null
    }
    onInputChange=(e)=>{
      this.setState({
          [e.target.name]:e.target.value
      })
  }
  handleClose = () =>{
      this.setState({show:false})
  };
  handleShow = (price,name) => {
      this.setState({show:true,amount:price,cat:name})
  };

    makePayment=(token)=>{
      console.log(token)
      const body={
          token,
          amount:5000
      }
      axios.post("/payment",body,{headers: {token: Cookies.get('token')}})
      .then(response => {
       if(response.data.check==true){
           this.setState({basic:true,free:false,premium:false})
       }
      })
      .catch(error => {
          console.log(error)
      })   
  }
    getdata()
    {
        axios.get('/all_actions_info')
        .then(responce=>{
            console.log(responce.data)
            this.setState({all_actions_data:responce.data});
        })
    }
    getPlansrelatedAction=(pname)=>
    {
        axios.get(`/get_all_plans_related_data/${pname}`)
        .then(res=>{
          console.log(res.data)
          this.setState({pname:res.data})
        })
    }
    get_user_plan_info()
    {
        axios.get('/profile_info',{headers:{token:Cookies.get('token')}})
        .then(responce=>{
            console.log(responce.data.profile);
            this.setState({category:responce.data.profile.category})
        })
    }
    componentDidMount()
    {
        axios.get('/get_all_plans')
        .then(res=>{
            console.log(res.data)
            this.setState({plans:res.data})
        })
        this.getdata()
        this.get_user_plan_info()
    }
    formPaymentSubmit=(e)=>{
      e.preventDefault();
      fetch('/payment',{
        method:'post',
        body:JSON.stringify(this.state),
        headers:{
            'Content-Type':'application/json',
             token: Cookies.get('token')
          }
    })
    swal("Success!", "Package Updated Successfully !", "success");      
    window.location.href=`/user_manage_packages`
    }
    render() {
        if(!Cookies.get('token'))
        {
            this.setState({redirect:'/login'})
        }
        if(this.state.redirect)
        {
            return <Redirect to="login"/>
        }
    return (
    <>
    <body class="fixed-navbar">
    <div class="page-wrapper">
    <Menubar name="PACK"/>
    <div class="content-wrapper">
        <div class="page-content fade-in-up">
        <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
    <Modal.Title>Upgrade Plan to {this.state.cat}</Modal.Title>
        </Modal.Header>
  <Modal.Body>
  <form onSubmit={this.formPaymentSubmit}>
            <div class="form-group">
                <label>Card #</label>
                <input type="text" value={this.state.card_number} class="form-control item" minLength="16" title="Card Number is Incorrect" name="card number" name="card_number" placeholder="Card Number without dashes (-)"  onChange={(e)=>this.onInputChange(e)} required/>
            </div>
            <div class="form-group">
            <label>Expiry Date</label>
                <input type="date" value={this.state.expiry} class="form-control item" name="expiry" onChange={(e)=>this.onInputChange(e)} required/>
            </div>
            <div class="form-group">
            <label>CVV Number</label>
                <input type="text" value={this.state.cvv} class="form-control item" name="cvv" minLength="3" placeholder="Cvv Number at the back of the card" title="CV Should be at least 3 characters long and not contain ant space" onChange={(e)=>this.onInputChange(e)} required/>
            </div>
            <div class="form-group">
            <label>Amount</label>
                <input type="text" value={this.state.amount} class="form-control item " disabled required/>
            </div>
            <input type="submit" value="Pay" class="btn btn-primary"/>
          </form>
      </Modal.Body>
      </Modal>

        <section id="pricing" class="pricing">
      <div class="container" data-aos="fade-up">
          <h1 className="text-center">All Packages Information {this.state.category}</h1>
        <p className="text-center">Every package comes with different actions, which are detailed below</p>
        <div class="row">
          {this.state.plans.map((data,index)=>(
          <>
          <div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">
            <div class="box">
          <h3>{data.pname}</h3>
              <h4><sup>$</sup>{data.pprice}<span>per month</span></h4>
              <ul>

              {
  this.state.all_actions_data.filter(data1=>data1.aplan==data.pname
  ).map(data2 => (
    <li><i class="bx bx-check"></i>{data2.aname}</li>
   ))
  }                         
{
data.pname=="Standard"?this.state.all_actions_data.filter(data1 => data1.aplan!='Premium'&&data1.aplan!='Standard').map(data2 => (
  <li><i class="bx bx-check"></i> <span>{data2.aname}</span></li>
)):null
}
{
data.pname=="Premium"?this.state.all_actions_data.filter(data1 => data1.aplan!='Premium').map(data2 => (
  <li><i class="bx bx-check"></i> <span>{data2.aname}</span></li>
)):null
}
</ul>
     {
     this.state.category==data.pname?<button class="btn btn-disabled disabled btn-primary">Your Plan</button>:
     <button className={'btn btn-primary'} onClick={()=>this.handleShow(data.pprice,data.pname)}>I want this Package</button>   
     }
        </div>
       </div>
      </>   
    ))}
        </div>
      </div>
    </section>
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