import React, { Component } from 'react'
import MainPage from './Users/MainPage'
import Login from './Users/Login'
import Admin from './Admin/AdminLogin'
import Signup from './Users/Signup'
import Total_Reveneu from './Admin/Total_Reveneu'
import ResetPassword from './Users/ResetPassword'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import ResetAdminPassword from './Admin/ResetAdminPassword'
import Dashboard from './Users/Dashboard'
import Admin_Profile from './Admin/Admin_Profile'
import Add_New_Admin from './Admin/Add_New_Admin'
import Admin_Panel from './Admin/Admin_Panel'
import Manage_Actions from './Admin/Manage_Actions'
import Manage_Customers from './Admin/Manage_Customers'
import Manage_Packages from './Admin/Manage_Packages'
import Manage_Plans from './Admin/Manage_Plans'
import User_Panel from './Users/User_Panel'
import User_Profile from './Users/User_Profile'
import User_Manage_Packages from './Users/User_Manage_Packages'
import Upload_Data from './Users/Upload_Data'
import Churn_Analysis from './Users/Predictions/Churn_Analysis'
import Sales_Forecasting from './Users/Predictions/Sales_Forecasting'
import Market_Basket from './Users/Predictions/Market_Basket'
import RFM_Segmentation from './Users/Predictions/RFM_Segmentation'
import LTV_Prediction from './Users/Predictions/LTV_Prediction'
import Responce_Modeling from './Users/Predictions/Responce_Modeling'
import Uplift_Modeling from './Users/Predictions/Uplift_Modeling'
import Change_Password from './Users/Change_Password'
import Preview_Data from './Users/Preview_Data'
import Admin_Change_Password from './Admin/Admin_Change_Password'
import Guide from './Users/Guide'
import Total_Admins from './Admin/Total_Admins'

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
                    <Route path="/user_panel" exact><User_Panel/></Route>
                    <Route path="/user_profile" exact><User_Profile/></Route>
                    <Route path="/user_manage_packages" exact><User_Manage_Packages/></Route>
                    <Route path="/upload_data" exact><Upload_Data/></Route>
                    <Route path="/sales_forecasting" exact><Sales_Forecasting/> </Route>
                    <Route path="/market_basket_analysis" exact><Market_Basket/></Route>
                    <Route path="/rfm_segmentation" exact><RFM_Segmentation/></Route>
                    <Route path="/lifetime_value_prediction" exact><LTV_Prediction/></Route>
                    <Route path="/churn_analysis" exact><Churn_Analysis/></Route>
                    <Route path="/market_responce_modeling" exact><Responce_Modeling/></Route>
                    <Route path="/uplift_modeling" exact><Uplift_Modeling/></Route>
                    <Route exact path="/change_password/:id" 
                        render={({ match }) => (
                            <Change_Password match={match} />
                        )} 
                    />
                    <Route path="/preview_data" exact><Preview_Data/></Route>
                    <Route path="/guide" exact><Guide/></Route>
                    
                    {/* For Admin Routes */}
                    
                    <Route path="/total_reveneu" exact><Total_Reveneu/></Route>
                    <Route path="/admin" exact><Admin/></Route>
                    <Route path="/add_new_admin" exact><Add_New_Admin/></Route>
                    <Route path="/admin_panel" exact><Admin_Panel/></Route>
                    <Route path="/admin_profile" exact><Admin_Profile/></Route>
                    <Route path="/manage_actions" exact><Manage_Actions/></Route>
                    <Route path="/manage_packages" exact><Manage_Packages/></Route>
                    <Route path="/manage_customers" exact><Manage_Customers/></Route>
                    <Route path="/manage_plans" exact><Manage_Plans/></Route>
                    <Route path="/all_admins" exact><Total_Admins/></Route>
                    <Route exact path="/admin_change_password/:id" 
                        render={({ match }) => (
                            <Admin_Change_Password match={match} />
                        )} 
                    />

                </Switch>
            </Router>  
            </>
        )
    }
}
