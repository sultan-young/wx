import React, { Component } from 'react'
import { SearchBar } from 'antd-mobile';
import {connect} from 'react-redux'

import './message.css'

 class Message extends Component {
    
     componentDidMount() {
         this.props.setTitle("微信");
     }
     
    
    ClickFun(item){
        this.props.setchatuserinfo(this.props.username.username,item.username,item.netname)
        this.props.history.push(`/index/chat/${item.username}`)
    }
    render() {
        return (
            <div>
                 <SearchBar placeholder="搜索" maxLength={8} />  
                <ul className="message-box">
                    {
                        this.props.messageList.map(item=><li className="message-item" key={item.username}
                        onClick={_=>{this.ClickFun(item)}}
                        >
                            <div className="photo-box-wrap">
                                <div className="photo-box" >
                                    <img src={"http://127.0.0.1:5001/uploads/header/"+item.username+".jpg"} alt="图片"/>
                                    {
                                        item.unread !== 0 ? 
                                        <div className="dot"></div> 
                                        : 
                                        null
                                    }
                                </div>
                            </div>
                            <div className="msg-box">
                                <div className="chatname">{item.netname}</div>
                                  <div className="lastmsg">{item.msg[item.msg.length-1].msg}</div>
                            </div>
                        </li>)
                    }
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        username : state.userinfo,
        messageList : state.messageList
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
    },
    setchatuserinfo : (from,to,toNetName)=>{
        return (dispatch)=>{
            dispatch({
                type: "chat",
                payload : {
                    from,
                    to,
                    toNetName
                }
            })
        }
    },
}


export default connect(mapStateToProps,mapDispatchToProps)(Message)