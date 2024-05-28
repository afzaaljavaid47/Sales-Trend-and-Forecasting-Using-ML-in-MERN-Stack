import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export default class Footer extends Component {
    render() {
        return (
            <div>
                <footer class="page-footer">
                <div class="font-13">2020 © <b>Sales Trend & Forecasting Using Data Mining Tecniques</b> - All rights reserved.</div>
                <Link class="px-4" to="/manage_packages">CHANGE PLAN</Link>
                <div class="to-top"><i class="fa fa-angle-double-up"></i></div>
            </footer>
            </div>
        )
    }
}
