import React, { Component } from 'react'
import {connect} from 'react-redux'
import './addresslist.css'
import Template from '../template/Template'

class Addresslist extends Component {
    componentDidMount() {
        this.props.setTitle("通讯录")
        var dom = this.refs["address-user-box"]
        var footerDom = document.getElementById("footerDom")?document.getElementById("footerDom").clientHeight:50
        dom.style.padding = `10px 0px ${footerDom}px 0px `
    }
    render() {
        return (
            <div>
                <div ref="address-user-box" className="address-user-box">
                        <div className="address-user-header-box">
                                <Template title="新的朋友" onClick={()=>{
                                    this.props.history.push('/add/adduser')
                                }} i-bgcolor="orange" iconfont="icon-tianjiahaoyou"></Template>
                        </div>
                        {
                            this.props.addressdata.map(item=>(
                                <li key={item.username} className="address-user-item">
                                    <div className="address-user-item-photo">
                                      <img alt=""  src={`http://127.0.0.1:5001/uploads/header/${item.username}.jpg`}/>
                                    </div>
                                    <div className="address-user-item-netname">{item.netname}</div>
                                </li>
                            ))
                        }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        addressdata : state.addressdata
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


export default connect(mapStateToProps,mapDispatchToProps)(Addresslist)