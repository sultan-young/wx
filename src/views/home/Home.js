import React, { Component } from 'react'
import { Button } from 'antd-mobile';
import { withRouter} from 'react-router-dom'
import './home.css'

 class Home extends Component {
   
    render() {
        return (
            <div id="home">
               <div className="btn-box">
                <Button  onClick={()=>{this.props.history.push("/login")}} style={{background:"#fff",color:"#000",width:"35%",height:"auto"}}>登录</Button>
                <Button  onClick={()=>{this.props.history.push("/register")}} style={{background:"green",color:"#fff",width:"35%"}}>注册</Button>
               </div>
            </div>
        )
    }
}

export default withRouter(Home)