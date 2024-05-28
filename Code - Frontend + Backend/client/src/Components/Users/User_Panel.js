import React, { Component } from 'react'
import Menubar from './Menubar'
import Footer from './Footer'
import Setting_Menu from './Setting_Menu'
import Main_Content from './Main_Content'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
export default class User_Panel extends Component {
    state={
        redirect:null,
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
    <Menubar/>
        <div class="content-wrapper">
            <div class="page-content fade-in-up">
             <Main_Content/>
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