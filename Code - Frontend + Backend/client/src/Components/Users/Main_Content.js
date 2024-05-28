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
                                <h2 class="m-b-5 font-strong">1</h2>
                                <div class="m-b-5">USER GUIDE MANUAL</div><i class="ti-book widget-stat-icon"></i>
                                <div><a href="guide" style={{color:'white'}}><i class="fa fa-question-circle m-r-5"></i><small>View Manual</small></a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="ibox bg-warning color-white widget-stat">
                            <div class="ibox-body">
                                <h2 class="m-b-5 font-strong">2</h2>
                                <div class="m-b-5">MANAGE PACKAGES</div><i class="ti-stats-up widget-stat-icon"></i>
                                <div><a href="/user_manage_packages" style={{color:'white'}}><i class="fa fa-question-circle m-r-5"></i><small>View Packages</small></a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="ibox bg-info color-white widget-stat">
                            <div class="ibox-body">
                                <h2 class="m-b-5 font-strong">1</h2>
                                <div class="m-b-5">UPLOAD DATA</div><i class="ti-upload widget-stat-icon"></i>
                                <div><a href="/upload_data" style={{color:'white'}}><i class="fa fa-info-circle m-r-5"></i><small>Upload Data</small></a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="ibox bg-danger color-white widget-stat">
                            <div class="ibox-body">
        <h2 class="m-b-5 font-strong">1</h2>
        <div class="m-b-5">MY PROFILE</div><i class="ti-info widget-stat-icon"></i>
            <div><a href="/user_profile" style={{color:'white'}}><i class="fa fa-info-circle m-r-5"></i><small>View Profile</small></a></div>
        </div>
        </div>
        </div>
            </div>
        </div>
    </section>

    <section id="services" class="services section-bg" style={{marginTop:-90}}>
      <div class="container" data-aos="fade-up">
        <div class="section-title">
          <h2>User Guide Video</h2>
          <p style={{marginBottom:20}}>Watch video to know how it works</p>

          {/* <video controls width="900">
            <source src={Videos} type="video/mp4"/>
            </video> */}

<iframe width="900" height="500" src="https://www.youtube.com/embed/fvV_EgAFmnI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>  </div>
            </div>
        </section>

            </div>
        )
    }
}
