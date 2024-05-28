import React, { Component } from 'react'

export default class User_Main_Content extends Component {
    render() {
        return (
<div>
    <section id="services" class="services section-bg" style={{marginTop:-50}}>
      <div class="container" data-aos="fade-up">
        <div class="section-title">
          <h2>User Guide Video</h2>
          <p style={{marginBottom:20}}>Watch video to know how it works</p>

          {/* <video controls width="900">
            <source src={Videos} type="video/mp4"/>
            </video> */}

        <iframe width="900" height="500" src="https://www.youtube.com/embed/fvV_EgAFmnI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
         </div>
            </div>
        </section>

        <section id="services" class="services section-bg" style={{marginTop:-110}}>
                <div class="container" data-aos="fade-up">
                <div class="section-title">
                <h2>How it works</h2>
                <p>Please follow the below instructions to know how it works.</p>
                </div>                
                </div>
        </section>
        <ol style={{marginTop:-60,fontSize:16,lineHeight:2}}>
                    <li>Click on <b>Guide Manual</b> button and watch full video to know how it works.</li>
                    <li>By clicking on <b>Total Predictions</b> buttons you can see the total predictions that we are offering including <b>Data Preprocessing, Sales Forecasting, Market Basket Analysis and Data Visualization.</b></li>
                    <li>First you will upload your data to our server by click on <b>Upload Data</b> button and than browse the file and upload it.</li>
                    <li>You can also download the uploaded data to your PC.</li>
                    <li>To see your uploaded data preview please click on <b>Preview Data</b> Button.</li>
                    <li>Cick on <b>Sales Forecasting</b> button to get insights of sales forecasting.</li>
                    <li>You will see the graphical visualization of your data.</li>
                    <li>Click on <b>Masket Basket</b> analysis button to get insights of market basket analysis.</li>
                    <li>You can also update and view your profile by clicking on <b>My Profile</b> button.</li>
                    <li>You can also download the predicted files for future use.</li>
                </ol>
                
        </div>
    )
    }
}
