import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../../App.css'
export default class Navbar extends Component {
    render() {
        return (
<>
<section class="menu cid-r6VkWYIybb" once="menu" id="menu1-0">
    <nav class="navbar navbar-dropdown navbar-fixed-top navbar-expand-lg">
      <div class="navbar-brand" style={{marginLeft:'50px'}}>
        <span class="navbar-caption-wrap">
            <Link class="navbar-caption text-black display-4" to="/">
               <img src="assets/img/logo.png" width="300px" height="70px"/>
         </Link></span>
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <div class="hamburger">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav nav-dropdown" data-app-modern-menu="true">
              <li class="nav-item">
                    <Link class="nav-link link text-black display-4" to="/">
                        Home
                    </Link>
                </li>
                <li class="nav-item">
                    <a class="nav-link link text-black display-4" href="#about">
                        About Us
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link link text-black display-4" href="#services">
                        Services
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link link text-black display-4" href="#team">
                        Team
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link link text-black display-4" href="#pricing">
                        Plans
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link link text-black display-4" href="#contact">
                        Contact Us
                    </a>
                </li>
                <li class="nav-item">
                    <Link class="nav-link link text-black display-4" to="/login">
                        Log in
                    </Link>
                </li>
            </ul>      
            <div class="navbar-buttons mbr-section-btn">
            <Link className="btn btn-sm btn-black display-4" to="/signup">
             Join Us</Link>
            </div>
      </div>
    </nav>
</section>

   </>
    )
    }
}
