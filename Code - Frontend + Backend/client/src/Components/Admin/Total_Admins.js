import React, { Component } from 'react'
import axios from 'axios'
import Menubar from './Menubar'
import Footer from './Footer'
import Setting_Menu from './Setting_Menu'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
export default class Total_Admins extends Component {
    state={
        records:[],
        redirect:null
    }
    componentDidMount()
    {
        this.getdata();
    }
    getdata()
    {
        axios.get('/all_admins_info')
        .then(responce=>{
            this.setState({records:responce.data});
        })
    }
    render() {
        if(!Cookies.get('adtoken'))
        {
            this.setState({redirect:'/admin'})
        }
        if(this.state.redirect)
        {
            return <Redirect to="/admin"/>
        }
return (
<body class="fixed-navbar">
    <div class="page-wrapper">
    <Menubar name='AA'/>
        <div class="content-wrapper">
        <div class="page-content fade-in-up">
        <h2 style={{padding:"20px"}} class="text-center">All Admins Information Table</h2>
        <div className="container" style={{marginBottom:'30px'}}>
        <table style={{marginTop:"200px"}} class="table table-striped table-bordered" style={{width:"100%"}}>
        <thead>
            <tr>
                <th>User Name</th>
                <th>E-Mail</th>
                <th>Phone No.</th>
                <th>Password</th>
            </tr>
        </thead>
        <tbody>
        
        {this.state.records.map((data,index)=>(
                    <tr>
                        <td>{data.uname}</td>
                        <td>{data.email}</td>
                        <td>{data.phone}</td>
                        <td>{data.password}</td>
                    </tr>
        ))}

        </tbody>
        <tfoot>
            <tr>
            <th>User Name</th>
            <th>E-Mail</th>
            <th>Phone No.</th>
            <th>Password</th>
            </tr>
        </tfoot>
    </table>        
    </div>
        </div>
        <Footer/>
        </div>
    </div>
    <Setting_Menu/>
</body>
        )
    }
}
