import React, { Component } from 'react'

export default class Main_Content extends Component {
render() {
return (
<div>
<section id="services" class="services section-bg" style={{marginTop:-55}}>
      <div class="container" data-aos="fade-up">
        <div class="section-title">
          <h2>Main Features</h2>
          <p>Please click on View Info button to manage these features or click on left vertical buttons to manage it.</p>
         </div>
<div class="row">
    <div class="col-lg-3 col-md-6">
        <div class="ibox bg-success color-white widget-stat">
            <div class="ibox-body">
                <h2 class="m-b-5 font-strong">{this.props.utotal}</h2>
                <div class="m-b-5">TOTAL CUSTOMERS</div><i class="ti-user widget-stat-icon"></i>
                <div><a href="manage_customers" style={{color:'white'}}><i class="fa fa-question-circle m-r-5"></i><small>View Info</small></a></div>
            </div>
        </div>
    </div>
    <div class="col-lg-3 col-md-6">
        <div class="ibox bg-info color-white widget-stat">
            <div class="ibox-body">
                <h2 class="m-b-5 font-strong">{this.props.atotal}</h2>
                <div class="m-b-5">TOTAL ACTIONS</div><i class="ti-bar-chart widget-stat-icon"></i>
                <div><a href="manage_actions" style={{color:'white'}}><i class="fa fa-info-circle m-r-5"></i><small>View All</small></a></div>
            </div>
        </div>
    </div>
    <div class="col-lg-3 col-md-6">
        <div class="ibox bg-warning color-white widget-stat">
            <div class="ibox-body">
                <h2 class="m-b-5 font-strong">{this.props.ptotal}</h2>
                <div class="m-b-5">TOTAL PLANS</div><i class="ti-package widget-stat-icon"></i>
                <div><a href="manage_plans" style={{color:'white'}}><i class="fa fa-question-circle m-r-5"></i><small>View Info</small></a></div>
            </div>
        </div>
    </div>
<div class="col-lg-3 col-md-6">
    <div class="ibox bg-danger color-white widget-stat">
        <div class="ibox-body">
        <h2 class="m-b-5 font-strong">${
        
        this.props.rev_total.map((data,index)=>(
            <span>{(data.TotalAmount).toFixed(2)}</span>
            ))
        
        }</h2>
        <div class="m-b-5">TOTAL REVENEU</div><i class="ti-money widget-stat-icon"></i>
            <div><a href="/total_reveneu" style={{color:'white'}}><i class="fa fa-info-circle m-r-5"></i><small>View Info</small></a></div>
        </div>
        </div>
        </div>
            </div>
            </div>
    </section>
            <section id="services" class="services section-bg" style={{marginTop:-90}}>
      <div class="container" data-aos="fade-up">
        <div class="section-title">
          <h2>Admin Guide Video</h2>
          <p style={{marginBottom:20}}>Watch video to know how it works</p>
        <iframe width="900" height="500" src="https://www.youtube.com/embed/fvV_EgAFmnI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
         </div>
        </div>
    </section> 
            </div>
        )
    }
}
