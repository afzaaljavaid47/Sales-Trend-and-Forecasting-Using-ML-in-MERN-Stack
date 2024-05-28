import React, { Component } from 'react'
import Menubar from './Menubar'
import Footer from './Footer'
import axios from 'axios'
import Setting_Menu from './Setting_Menu'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
export default class Manage_Packages extends Component {
    state={
        redirect:null,
        plans:[],
        related_data:[],
        all_actions_data:[]
    }
    getdata()
    {
        axios.get('/all_actions_info')
        .then(responce=>{
            console.log(responce.data)
            this.setState({all_actions_data:responce.data});
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
    <Menubar name="MP"/>
    <div class="content-wrapper">
        <div class="page-content fade-in-up">
        <section id="pricing" class="pricing">
      <div class="container" data-aos="fade-up">
          <h2 className="text-center">All Packages Information</h2>
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
data.pname=="Standard"?this.state.all_actions_data.filter(data1 => data1.aplan!=='Premium'&&data1.aplan!=='Standard').map(data2 => (
  <li><i class="bx bx-check"></i> <span>{data2.aname}</span></li>
)):null
}
{
data.pname=="Premium"?this.state.all_actions_data.filter(data1 => data1.aplan!=='Premium').map(data2 => (
  <li><i class="bx bx-check"></i> <span>{data2.aname}</span></li>
)):null
}

</ul>
              <a href="/manage_actions" class="buy-btn">Update Package</a>
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