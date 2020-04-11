import React, { Component } from 'react'
import {connect} from 'react-redux'
import './my.css'

class My extends Component {
    componentDidMount() {
        this.props.setHeaderHidden()
    }
    componentWillUnmount(){
        this.props.setHeaderShow()
    }
    logout(){
        localStorage.clear()
        this.props.history.push('/')
    }
    render() {
        return (
            <div id="my-box">
                {console.log(this.props.userinfo)}
                <div className="my">
                   <dl >
                       <dt className="header-photo-box">
                            <img className="header-photo" src={this.props.userinfo.photopath} alt="头像"/>
                       </dt>
                       <dd>
                            <div className="netname">{this.props.userinfo.netname}</div>
                            <div className="username">微信号：{this.props.userinfo.username}</div>
                       </dd>
                   </dl>
                </div>
                <div onClick={_=>{this.logout()}} id="found-Circle-box">
                    <i  className="iconfont found-icon">&#xe66d;</i>
                    <span className="found-span">注销</span>
                    <i  className="iconfont found-jiantou">&#xe603;</i>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        userinfo : state.userinfo
    }
}
const mapDispathcToProps = {
    setHeaderHidden : ()=>{
        return (dispatch)=>{
            dispatch({
                type : "headerisShow",
                payload : false
            })
        }
    },
    setHeaderShow : ()=>{
        return (dispatch)=>{
            dispatch({
                type : "headerisShow",
                payload : true
            })
        }
    }
}
export default connect(mapStateToProps,mapDispathcToProps)(My)