import React, { Component } from 'react'
import Menubar from './Menubar'
import Footer from './Footer'
import Setting_Menu from './Setting_Menu'
import Main_Content from './Main_Content'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
export default class Admin_Panel extends Component {
    state={
        redirect:null,
        atotal:null,
        ptotal:null,
        utotal:null,
        reveneu_total:[]
    }
    componentDidMount(){
        axios.get('/get_count_data')
        .then(res=>{
            console.log(res.data.reveneu_total)
            this.setState({
                atotal:res.data.atotal,
                ptotal:res.data.ptotal,
                utotal:res.data.utotal,
                reveneu_total:res.data.reveneu_total
            })
        })
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
    <Menubar/>
        <div class="content-wrapper">
            <div class="page-content fade-in-up">
             <Main_Content atotal={this.state.atotal} ptotal={this.state.ptotal} utotal={this.state.utotal} rev_total={this.state.reveneu_total}/>
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