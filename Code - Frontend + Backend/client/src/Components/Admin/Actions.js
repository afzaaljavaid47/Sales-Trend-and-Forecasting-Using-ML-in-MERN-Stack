import React, { Component } from 'react'
import axios from 'axios'
export default class Actions extends Component {
   state={
       data:[]
   }
    getaction_related_data(aname)
    {
      axios.get(`/get_all_plans_related_data/${aname}`)
      .then(responce=>{
          console.log(responce.data)
          this.setState({data:responce.data});
      })
    } 
    render() {
        const {pname}=this.props
        return (
            <div>
            {this.getaction_related_data(pname)}    
            {JSON.stringify(this.state.data)}
            </div>
        )
    }
}
