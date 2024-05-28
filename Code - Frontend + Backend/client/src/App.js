import React, { Component } from 'react'
import MainPage from './Components/MainPage'
//import axios from 'axios'
export default class App extends Component {
  state={
    uname:'',
    email:'',
    password:'',
    data:[]
  }
  inputChange=(e)=>{
   this.setState({[e.target.name]:e.target.value})
  }
  getData=()=>{
    fetch('/get-data',{
      method:'get',
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      this.setState({data:data})
    })
  }
  componentDidMount(){
    this.getData()
  }
  formSubmit=(e)=>{
    e.preventDefault();
    //axios.post("/sent-data",this.state)
        fetch('/sent-data',{
            method:"post",
            body:JSON.stringify(this.state),
            headers:{
              'Content-Type':'application/json'
            }
        }).then(res=>res.json())
        .then(res2 => console.log(res2)); 
        this.getData()
  }
  render() {
    return (
      <div>
        <MainPage/>
        <form onSubmit={this.formSubmit}>
          <div className="form-group">
            <label>User Name</label>
            <input type="text" name="uname" value={this.state.uname} onChange={(e)=>this.inputChange(e)} className="form-control"/>
          </div>
          <div className="form-group">
            <label>E-Mail</label>
            <input type="email" name="email" value={this.state.email} onChange={(e)=>this.inputChange(e)} className="form-control"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={this.state.password} onChange={(e)=>this.inputChange(e)} name="password" className="form-control"/>
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
        <table className="table table-striped table-condenced">
          <thead>
            <tr>
              <td>ID</td>
              <td>User Name</td>
              <td>E-Mail</td>
              <td>Password</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            
              {
              this.state.data.map((data,index)=>(
                <>
            <tr>
            <td>{index}</td>
            <td>{data.uname}</td>  
            <td>{data.email}</td>  
            <td>{data.password}</td>  
            <td><button className="btn btn-primary">Edit</button>&nbsp;<button className="btn btn-danger">Delete</button></td>
            </tr>
                </>
              ))
              }
              
            
          </tbody>
        </table>
      </div>
    )
  }
}
