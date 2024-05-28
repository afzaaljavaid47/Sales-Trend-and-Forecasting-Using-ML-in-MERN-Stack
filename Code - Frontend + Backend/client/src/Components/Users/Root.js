import React, { Component } from 'react'
import MainPage from './MainPage'
import Login from './Login'
import Admin from '../Admin/AdminLogin'
import Signup from './Signup'
import ResetPassword from './ResetPassword'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import ResetAdminPassword from '../Admin/ResetAdminPassword'
import Dashboard from './Dashboard'
import AdminDashboard from '../Admin/AdminDashboard'
import Admin_Profile from '../Admin/Admin_Profile'
import Add_New_Admin from '../Admin/Add_New_Admin'
import Admin_Panel from '../Admin/Admin_Panel'
export default class Root extends Component {
    render() {
        return (
            <>
            <Router>
                <Switch>
                    {/* For Users Routes */}
                    
                    <Route path="/" exact><MainPage/></Route>
                    <Route path="/login" exact><Login/></Route>
                    <Route path="/signup" exact><Signup/></Route>
                    <Route path="/reset_password" exact><ResetPassword/></Route>
                    <Route path="/reset_admin_password" exact><ResetAdminPassword/></Route>
                    <Route path="/dashboard" exact><Dashboard/></Route>
                    
                    {/* For Admin Routes */}
                    
                    <Route path="/admin" exact><Admin/></Route>
                    <Route path="/admin_dashboard" exact> <AdminDashboard/></Route>
                    <Route path="/add_new_admin" exact><Add_New_Admin/></Route>
                    <Route path="/admin_panel" exact><Admin_Panel/></Route>
                    <Route path="/admin_profile" exact><Admin_Profile/></Route>
                
                </Switch>
            </Router>  
            </>
        )
    }
}
