import React, { Component } from 'react'
import Navbar from './Navbar'
import {Link} from 'react-router-dom'
import axios from 'axios'
import buffering from '../../images/buffering.gif';
import styles from '../../css/uploaddata.module.css';
import swal from 'sweetalert'

export default class MainPage extends Component {
  state={
    buffering:false
  }
  onFormSubmit=(e)=>{
    this.setState({buffering:true})
    e.preventDefault()
    axios.post('/send-contact-email',this.state)
        .then(data=>{
          this.setState({buffering:false})          
          console.log(data.data.data)
          if(data.data.data=="Some errors, try again!")
          {
            swal("Error!",data.data.data, "error");
          }
          else
          {
          swal("Success!",data.data.data, "success");
           this.clear()
          }
        })
  }
  clear()
  {
    this.setState({
      name:'',
      email:'',
      subject:'',
      message:''
    })
  }
  input_change=(e)=>{
    this.setState({
    [e.target.name]:e.target.value})
  }
  state={
    name:'',
    email:'',
    subject:'',
    message:''
  }
render() {
  return (
  <div>
<Navbar/>
<section style={{marginTop:'-45px'}} id="hero" class="d-flex align-items-center">
    <div className="container">
      <div class="row">
        <div class="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
          <h1>Better Solutions For Your Business</h1>
          <h2 style={{textAlign:'justify',lineHeight:'26px'}}>Your Store's data contain useful information.
            We run modern data science scripts on it to
            extract meaningful Insights and do Predictions.</h2>
          <div class="d-lg-flex">
            <Link to="/signup" class="btn-get-started scrollto">Join Our Platform for Free</Link>
            <Link to="/login" class="btn-get-started scrollto">Log in</Link>
         </div>
        </div>
        <div class="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-delay="200">
          <img src="assets/img/hero-img.png" class="img-fluid animated" alt=""/>
        </div>
      </div>
    </div>

  </section>
  <section id="about" class="about">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>About Us</h2>
        </div>

        <div class="row content">
          <div class="col-lg-6">
            <p style={{textAlign:'justify'}}>
            Our proposed solution will provide single platform for user to predict the sales of the
products, their trend in market and do comparative analysis of sales prediction using different
data mining techniques.
            </p>
            <ul>
              <li><i class="ri-check-double-line"></i>Sales Forecasting, Market Basket</li>
              <li><i class="ri-check-double-line"></i>Market Responce Modeling, Market Responce Modeling</li>
              <li><i class="ri-check-double-line"></i>RFM Segmentation, Uplift Modeling, Churn Analysis</li>
            </ul>
          </div>
          <div class="col-lg-6 pt-4 pt-lg-0">
            <p style={{textAlign:'justify'}}>
            This project is
            capable of predicting and recommending productive ways to enhance sales of a store. Several
            data mining techniques will be used to perform a list of predictions and recommendations. There
            is currently no such application capable of accommodating small e-commerce stores with such
            credible information. So in this proposed project we will build a system which do comparative
            analysis of sales prediction by using latest and innovative tools & techniques. Furthermore, the
            store owners will get a visual representation of the results which can help in decision making.
            </p>
            <a href="assets/srs/Final_Deliverable_Details.pdf" target="_blank" class="btn-learn-more">Learn More</a>
          </div>
        </div>
      </div>
    </section>
    <section id="services" class="services section-bg">
      <div class="container" data-aos="fade-up">
        <div class="section-title">
          <h2>Services</h2>
          <p>The E-commerce industry is in dire need of intelligent forecasting model of sales trends
              with highest possible level of accuracy. There is a need to develop a tool which predict sales and
              do the comparative analysis of sales prediction using data mining techniques. So we are introducing a system that will fill this market gap with following services</p>
        </div>
        <div class="row">
          <div class="col-xl-3 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
            <div class="icon-box">
              <div class="icon"><i class="bx bxs-analyse"></i></div>
              <h4><a href="#">Sales Forecasting</a></h4>
              <p style={{textAlign:"justify"}}>
              Sales forecasting is the process of estimating future sales. Accurate sales forecasts enable companies to make informed business decisions and predict short-term and long-term performance.
              </p>
            </div>
          </div>
          <div class="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="zoom-in" data-aos-delay="200">
            <div class="icon-box">
              <div class="icon"><i class="bx bx-basket"></i></div>
              <h4><a href="#">Market Basket</a></h4>
              <p style={{textAlign:"justify"}}>
              Market Basket Analysis is one of the key techniques used by large retailers to uncover associations between items. It works by looking for combinations of items that occur together frequently in transactions.
              </p>
            </div>
          </div>

          <div class="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-xl-0" data-aos="zoom-in" data-aos-delay="300">
            <div class="icon-box">
              <div class="icon"><i class="bx bx-shape-polygon"></i></div>
              <h4><a href="#">Churn Analysis</a></h4>
              <p style={{textAlign:"justify"}}>
              Churn analysis is the evaluation of a company's customer loss rate in order to reduce it. Also referred to as customer attrition rate, churn can be minimized by assessing your product and how people use it. 
              </p>
            </div>
          </div>

          <div class="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-xl-0" data-aos="zoom-in" data-aos-delay="400">
            <div class="icon-box">
              <div class="icon"><i class="bx bx-donate-blood "></i></div>
              <h4><a href="#">Uplift Modeling</a></h4>
              <p style={{textAlign:"justify"}}>Uplift modelling, also known as incremental modelling, true lift modelling, or net modelling is a predictive modelling technique that directly models the incremental impact of a treatment on an individual's behaviour.</p>
            </div>
          </div>

        </div>
        <div class="row" style={{marginTop:'20px'}}>
        <div class="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-xl-0" data-aos="zoom-in" data-aos-delay="400">
            <div class="icon-box">
              <div class="icon"><i class="bx bx-layer"></i></div>
              <h4><a href="#">Sales Trend Analysis</a></h4>
              <p style={{textAlign:"justify"}}>Sales Trend Analysis looks at historical revenue data to identify patterns, used extensively in budgeting and forecasting. It is a useful method to detect short-term changes in revenue growth.</p>
            </div>
          </div>
          <div class="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-xl-0" data-aos="zoom-in" data-aos-delay="300">
            <div class="icon-box">
              <div class="icon"><i class="bx bx-tachometer"></i></div>
              <h4><a href="#">Market Responce Modeling</a></h4>
              <p style={{textAlign:"justify"}}>Market response models are intended to help scholars and managers understand how consumers individually and collectively respond to marketing activities, and how competitors interact.</p>
            </div>
          </div>


          <div class="col-xl-3 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
            <div class="icon-box">
              <div class="icon"><i class="bx bxl-dribbble"></i></div>
              <h4><a href="#">RFM Segmentation</a></h4>
              <p style={{textAlign:"justify"}}>Recency, frequency, monetary value is a marketing analysis tool used to identify a company's or an organization's best customers by using certain measures. </p>
            </div>
          </div>

          <div class="col-xl-3 col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="zoom-in" data-aos-delay="200">
            <div class="icon-box">
              <div class="icon"><i class="bx bx-body"></i></div>
              <h4><a href="#">Customer Lifetime Modeling</a></h4>
              <p style={{textAlign:"justify"}}>In marketing, customer lifetime value, lifetime customer value (LCV), or life-time value (LTV) is a prognostication of the net profit contributed to the whole future relationship with a customer.</p>
            </div>
          </div>

                    

        </div>

      </div>
    </section>
    <section id="team" class="team section-bg">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2> Our Team</h2>  
          <p>Meet our team members </p>
        </div>

        <div class="row">
          <div class="col-lg-6">
            <div class="member d-flex align-items-start" data-aos="zoom-in" data-aos-delay="100">
              <div class="pic"><img src="assets/img/team/team-1.jpeg" class="img-fluid" alt=""/></div>
              <div class="member-info">
                <h4>Arslan Serwar</h4>
                <span>Project Member</span>
                <p>Python Application Development</p>
                <div class="social">
                  <a href=""><i class="ri-twitter-fill"></i></a>
                  <a href=""><i class="ri-facebook-fill"></i></a>
                  <a href=""><i class="ri-instagram-fill"></i></a>
                  <a href=""> <i class="ri-linkedin-box-fill"></i> </a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-6 mt-4 mt-lg-0">
            <div class="member d-flex align-items-start" data-aos="zoom-in" data-aos-delay="200">
              <div class="pic"><img src="assets/img/team/team-2.jpeg" class="img-fluid" alt=""/></div>
              <div class="member-info">
                <h4>Khurram Mehmood</h4>
                <span>Project Member</span>
                <p>Node.js Backend Developer</p>
                <div class="social">
                  <a href=""><i class="ri-twitter-fill"></i></a>
                  <a href=""><i class="ri-facebook-fill"></i></a>
                  <a href=""><i class="ri-instagram-fill"></i></a>
                  <a href=""> <i class="ri-linkedin-box-fill"></i> </a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-6 mt-4">
            <div class="member d-flex align-items-start" data-aos="zoom-in" data-aos-delay="300">
              <div class="pic"><img src="assets/img/team/team-3.jpeg" class="img-fluid" alt=""/></div>
              <div class="member-info">
                <h4>Bilal Mahais</h4>
                <span>Project Member</span>
                <p>Expertise in Documentation</p>
                <div class="social">
                  <a href=""><i class="ri-twitter-fill"></i></a>
                  <a href=""><i class="ri-facebook-fill"></i></a>
                  <a href=""><i class="ri-instagram-fill"></i></a>
                  <a href=""> <i class="ri-linkedin-box-fill"></i> </a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-6 mt-4">
            <div class="member d-flex align-items-start" data-aos="zoom-in" data-aos-delay="400">
              <div class="pic">
                  <img src="assets/img/team/team-4.jpeg" height="300px" class="img-fluid" alt=""/>
              </div>
              <div class="member-info">
                <h4>Afzaal Javaid</h4>
                <span>Project Leader</span>
                <p>React.js Front End Developer</p>
                <div class="social">
                  <a href=""><i class="ri-twitter-fill"></i></a>
                  <a href=""><i class="ri-facebook-fill"></i></a>
                  <a href=""><i class="ri-instagram-fill"></i></a>
                  <a href=""> <i class="ri-linkedin-box-fill"></i> </a>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
    <section id="pricing" class="pricing">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>Pricing</h2>
          <p>Every plan comes with different predictions and forecasting techniques. So please select a pacheke according to your needs. We highly recommend you choose Premium plan, because it contains all the forecasting techniques that is necessary for the rapid growth of your business (Sales). </p>
        </div>

        <div class="row">

          <div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">
            <div class="box">
              <h3>Free Plan</h3>
              <h4><sup>$</sup>0.0<span>per month</span></h4>
              <ul>
                <li><i class="bx bx-check"></i> Sales Forecsting</li>
                <li><i class="bx bx-check"></i> Market Basket</li>
                <li class="na"><i class="bx bx-x"></i> <span>RFM Segmentation</span></li>
                <li class="na"><i class="bx bx-x"></i> <span>Uplift Modeling</span></li>
                <li class="na"><i class="bx bx-x"></i> <span>Churn Analysis</span></li>
                <li class="na"><i class="bx bx-x"></i> <span>Customer Lifetime Modeling</span></li>
                <li class="na"><i class="bx bx-x"></i> <span>Market Responce Modeling</span></li>
              </ul>
              <a href="/signup" class="buy-btn">Get Started</a>
            </div>
          </div>

          <div class="col-lg-4 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay="200">
            <div class="box featured">
              <h3>Basic Plan</h3>
              <h4><sup>$</sup>29.99<span>per month</span></h4>
              <ul>
              <li><i class="bx bx-check"></i> Sales Forecsting</li>
                <li><i class="bx bx-check"></i> Market Basket</li>
                <li><i class="bx bx-check"></i> <span>RFM Segmentation</span></li>
                <li><i class="bx bx-check"></i> <span>Uplift Modeling</span></li>
                <li class="na"><i class="bx bx-x"></i> <span>Churn Analysis</span></li>
                <li class="na"><i class="bx bx-x"></i><span>Customer Lifetime Modeling</span></li>
                <li class="na"><i class="bx bx-x"></i> <span>Market Responce Modeling</span>
              </li>
              </ul>
              <a href="/signup" class="buy-btn">Get Started</a>
            </div>
          </div>

          <div class="col-lg-4 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay="300">
            <div class="box">
              <h3>Premium Plan</h3>
              <h4><sup>$</sup>49.99<span>per month</span></h4>
              <ul>
              <li><i class="bx bx-check"></i> Sales Forecsting</li>
                <li><i class="bx bx-check"></i> Market Basket</li>
                <li><i class="bx bx-check"></i> <span>RFM Segmentation</span></li>
                <li><i class="bx bx-check"></i> <span>Uplift Modeling</span></li>
                <li><i class="bx bx-check"></i> <span>Churn Analysis</span></li>
                <li><i class="bx bx-check"></i><span>Customer Lifetime Modeling</span></li>
                <li><i class="bx bx-check"></i> <span>Market Responce Modeling</span>
              </li>
              </ul>
              <a href="/signup" class="buy-btn">Get Started</a>
            </div>
          </div>

        </div>

      </div>
    </section>
    <section id="contact" class="contact">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>Contact</h2>
          <p>You can contact us by simply filling the below form or call us on below number</p>
        </div>

        <div class="row">

          <div class="col-lg-5 d-flex align-items-stretch">
            <div class="info">
              <div class="address">
                <i class="icofont-google-map"></i>
                <h4>Location:</h4>
                <p>UET Lahore, Narowal Campus</p>
              </div>

              <div class="email">
                <i class="icofont-envelope"></i>
                <h4>Email:</h4>
                <p>salestrendandforecasting@gmail.com</p>
              </div>

              <div class="phone">
                <i class="icofont-phone"></i>
                <h4>Call:</h4>
                <p>+92 349 7462877</p>
              </div>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3379.954618377239!2d74.76491941651487!3d32.097512171621055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391953f55817d0e1%3A0x95c765f70d155ed0!2sUniversity%20of%20Engineering%20and%20Technology%20Lahore%20(Narowal%20Campus)!5e0!3m2!1sen!2s!4v1618811247236!5m2!1sen!2s" width="400" height="250"></iframe>
              </div>

          </div>

          <div class="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
            <form class="php-email-form" onSubmit={this.onFormSubmit}>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="name">Your Name</label>
                  <input onChange={(e)=>this.input_change(e)} type="text" value={this.state.name} name="name" class="form-control" id="name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" required />
                  <div class="validate"></div>
                </div>
                <div class="form-group col-md-6">
                  <label for="name">Your Email</label>
                  <input onChange={(e)=>this.input_change(e)} type="email" value={this.state.email} class="form-control" name="email" id="email" data-rule="email" data-msg="Please enter a valid email" required/>
                  <div class="validate"></div>
                </div>
              </div>
              <div class="form-group">
                <label for="name">Subject</label>
                <input onChange={(e)=>this.input_change(e)} type="text" class="form-control" value={this.state.subject} name="subject" id="subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
                <div class="validate"></div>
              </div>
              <div class="form-group">
                <label for="name">Message</label>
                <textarea onChange={(e)=>this.input_change(e)} class="form-control" name="message" value={this.state.message} rows="10" data-rule="required" data-msg="Please write something for us"></textarea>
                <div class="validate"></div>
              </div>
              <div class="text-center">
                <button type="submit">Send Message</button> {this.state.buffering?
              <img className={styles.loader} style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:10,marginBottom:10}} src={buffering} alt="Buffering"/>
              :null}
              </div>
             
            </form>
          </div>

        </div>

      </div>
    </section>
    <footer id="footer">
    <div class="container footer-bottom clearfix">
      <div class="copyright">
        &copy; Copyright <strong><span>Sales Trend and Forecasting Using Data Mining Techniques</span></strong>. All Rights Reserved
      </div>
    </div>
  </footer>
  <a href="#" class="back-to-top"><i class="ri-arrow-up-line"></i></a>
             </div>
        )
    }
}
