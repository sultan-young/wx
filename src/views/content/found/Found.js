import React, { Component } from 'react'
import {connect} from 'react-redux'
import './found.css'

class Found extends Component {
    componentDidMount() {
        this.props.setTitle("发现")
    }
    render() {
        return (
            <div id="found-box">
                <div onClick={_=>{this.props.history.push('/circle')}} id="found-Circle-box">
                    <i  className="iconfont found-icon">&#xe667;</i>
                    <span className="found-span">朋友圈</span>
                    <i  className="iconfont found-jiantou">&#xe603;</i>
                </div>
                <div id="found-Circle-box">
                    <i style={{color:"#de6016"}}  className="iconfont found-icon">&#xe661;</i>
                    <span className="found-span">扫一扫</span>
                    <i  className="iconfont found-jiantou">&#xe603;</i>
                </div>
                <div id="found-Circle-box">
                    <i style={{color:"blue"}}  className="iconfont found-icon">&#xe705;</i>
                    <span className="found-span">公众号</span>
                    <i  className="iconfont found-jiantou">&#xe603;</i>
                </div>
                <div id="found-Circle-box">
                    <i style={{color:"orange"}}  className="iconfont found-icon">&#xe62d;</i>
                    <span className="found-span">资讯</span>
                    <i  className="iconfont found-jiantou">&#xe603;</i>
                </div>
                <div id="found-Circle-box">
                    <i style={{color:"red"}}  className="iconfont found-icon">&#xe7b3;</i>
                    <span className="found-span">收藏</span>
                    <i  className="iconfont found-jiantou">&#xe603;</i>
                </div>
                <div id="found-Circle-box">
                    <i  style={{color:"black"}} className="iconfont found-icon">&#xe60a;</i>
                    <span className="found-span">相册</span>
                    <i  className="iconfont found-jiantou">&#xe603;</i>
                </div>
                <div id="found-Circle-box">
                    <i  style={{color:"#ca5454"}} className="iconfont found-icon">&#xe635;</i>
                    <span className="found-span">小游戏</span>
                    <i  className="iconfont found-jiantou">&#xe603;</i>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {

    }
}

const mapDispatchToProps = {
    setTitle : (title)=>{
        return (dispatch)=>{
            dispatch({
                type : "headerTitle",
                payload : title
            })
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Found)