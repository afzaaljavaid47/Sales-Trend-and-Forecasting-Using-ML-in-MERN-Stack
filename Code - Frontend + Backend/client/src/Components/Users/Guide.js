import React, { Component } from 'react'
import Menubar from './Menubar'
import Footer from './Footer'
import Setting_Menu from './Setting_Menu'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import User_Main_Content from './User_Main_Content'

export default class Guide extends Component {
    state={
        redirect:null
    }
render() {
    if(!Cookies.get('token'))
    {
        this.setState({redirect:'/login'})
    }
    if(this.state.redirect)
    {
        return <Redirect to="/login"/>
    }
return (
<>
<body class="fixed-navbar">
    <div class="page-wrapper">
    <Menubar name="GM"/>
        <div class="content-wrapper">
            <div class="page-content fade-in-up">
             <User_Main_Content/>
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