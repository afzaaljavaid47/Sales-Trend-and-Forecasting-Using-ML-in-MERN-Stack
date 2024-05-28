import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
export default class Menubar extends Component {
    logOut=()=>{
        Cookies.remove('adtoken')
        this.setState({redirect:'/admin'})
    }
    state={
        redirect:null,
        records:[]
    }
    componentDidMount()
    {
        axios.get('/get_admin_info',{headers:{token:Cookies.get('adtoken')}})
        .then(responce=>{
            console.log(responce.data.data);
            this.setState({records:responce.data.data})
        })
    }

    render() {
        if(this.state.redirect)
        {
            return <Redirect to="admin"/>
        }
        return (
            <div>
        <header class="header">
            <div class="page-brand">
                <a class="link" href="/admin_panel">
                    <span class="brand">Sales 
                        <span class="brand-tip">&nbsp;Forecasting</span>
                    </span>
                </a>
            </div>
            <div class="flexbox flex-1">
                <ul class="nav navbar-toolbar">
                    <li>
                        <a class="nav-link sidebar-toggler js-sidebar-toggler"><i class="ti-menu"></i></a>
                    </li>
                    <li>
                    </li>
                </ul>
                <ul class="nav navbar-toolbar ">
                    <li class="dropdown dropdown-user">
                        <a class="nav-link dropdown-toggle link" data-toggle="dropdown">
                            <img src={process.env.PUBLIC_URL+"dist/assets/img/admin-avatar.png"} />
                    <span></span>{this.state.records.uname}<i class="fa fa-angle-down m-l-5"></i></a>
                        <ul class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" href="admin_profile"><i class="fa fa-user"></i>Profile</a>
                            <li class="dropdown-divider"></li>
                            <Link class="dropdown-item" to="admin" onClick={this.logOut}><i class="fa fa-power-off"></i>Logout</Link>
                        </ul>
                    </li>
                </ul>
            </div>
        </header>
        <nav class="page-sidebar fixed" id="sidebar">
            <div id="sidebar-collapse">
                <div class="admin-block d-flex">
                    <div>
                    <img src={process.env.PUBLIC_URL+"dist/assets/img/admin-avatar.png"} width="45px"/>
                    </div>                    
                    <div class="admin-info">
                    <div class="font-strong">{this.state.records.uname}</div><small>Administrator</small></div>
                </div>
                <ul class="side-menu metismenu">
                    <li>
                        <a class="active" href="/admin_panel"><i class="sidebar-item-icon fa fa-th-large"></i>
                            <span class="nav-label">Dashboard</span>
                        </a>
                    </li>
                    <li class="heading">FEATURES</li>
                    <li>    
                        <a class={this.props.name==='MPL'?'active':''} href="manage_plans"><i class="sidebar-item-icon fa fa-dollar"></i>
                        <span class="nav-label">Manage Plans</span></a>
                    </li>
                    <li>
                        <a class={this.props.name==='MA'?'active':''} href="manage_actions"><i class="sidebar-item-icon fa fa-cubes"></i>
                            <span class="nav-label">Manage Actions</span>
                        </a>
                    </li>
                    <li>    
                        <a class={this.props.name==='MC'?'active':''} href="manage_customers"><i class="sidebar-item-icon fa fa-users"></i>
                            <span class="nav-label">Manage Customers</span></a>
                    </li>
                    <li>    
                        <a class={this.props.name==='MP'?'active':''} href="manage_packages"><i class="sidebar-item-icon fa fa-bookmark"></i>
                            <span class="nav-label">Manage Packages</span></a>
                    </li>
                     <li>
                        <a class={this.props.name==='TR'?'active':''} href="/total_reveneu">
                        <i class="sidebar-item-icon fa fa-money"></i>
                        <span class="nav-label">Total Reveneu</span>
                        </a>
                    </li>
                    <li>
                        <a class={this.props.name==='AA'?'active':''} href="/all_admins">
                        <i class="sidebar-item-icon fa fa-users"></i>
                        <span class="nav-label">Admins Info</span>
                        </a>
                    </li>
                    <li>
                        <a class={this.props.name==='ADMIN'?'active':''} href="/add_new_admin">
                        <i class="sidebar-item-icon fa fa-plus"></i>
                        <span class="nav-label">Add New Admin</span>
                        </a>
                    </li>
                    <li>
                        <a class={this.props.name==='PRO'?'active':''} href="/admin_profile">
                        <i class="sidebar-item-icon fa fa-user-o"></i>
                        <span class="nav-label">My Profile</span>
                        </a>
                    </li>
                    <li>
                        <Link to='/admin' onClick={this.logOut}>
                        <i class="sidebar-item-icon fa fa-sign-out"></i>
                        <span class="nav-label">Log Out</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
            </div>
        )
    }
}