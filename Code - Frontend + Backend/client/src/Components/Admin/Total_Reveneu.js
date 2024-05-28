import React, { Component } from 'react'
import axios from 'axios'
import Menubar from './Menubar'
import Footer from './Footer'
import Setting_Menu from './Setting_Menu'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
export default class Total_Reveneu extends Component {
    state={
        records:[],
        reveneu_total:[]
    }
    componentDidMount()
    {
        this.getdata();
        this.total_reveneu()
    }
    getdata()
    {
        axios.get('/all_reveneu_info')
        .then(responce=>{
            this.setState({records:responce.data});
        })
    }
    total_reveneu()
    {
        axios.get('/get_count_data')
        .then(res=>{
            this.setState({
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
            return <Redirect to="/admin"/>
        }
return (
<body class="fixed-navbar">
    <div class="page-wrapper">
    <Menubar name="TR"/>
        <div class="content-wrapper">
        <div class="page-content fade-in-up">
        <h2 style={{padding:"10px"}} class="text-center">All Customers Reveneu Table</h2>
        
        <h2 class="text-center" style={{paddingBottom:'10px'}}>Total Reveneu: $ <b><u class="text-danger">
        {
        
        this.state.reveneu_total.map((data,index)=>(
            <span>{(data.TotalAmount).toFixed(2)}</span>
            ))
        
        }
        </u></b></h2>
        
        <div className="container" style={{marginBottom:'30px'}}>
        <table style={{marginTop:"200px"}} class="table table-striped table-bordered" style={{width:"100%"}}>
        <thead>
            <tr>
            <th>User ID</th>
            <th>Card Number</th>
            <th>Expiry Date</th>
            <th>CVV Number</th>
            <th>Amount</th>
            <th>Upgraded Package</th>
            </tr>
        </thead>
        <tbody>
        
        {this.state.records.map((data,index)=>(
                    <tr>
                        <td>{data.user_id}</td>
                        <td>{data.card_number}</td>
                        <td>{data.expiry_date}</td>
                        <td>{data.cvv}</td>
                        <td>{data.amount}</td>
                        <td>{data.upgraded_package_name}</td>
                    </tr>
        ))}
        </tbody>
        <tfoot>
            <tr>
            <th>User ID</th>
            <th>Card Number</th>
            <th>Expiry Date</th>
            <th>CVV Number</th>
            <th>Amount</th>
            <th>Upgraded Package</th>
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
