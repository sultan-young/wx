import ws from '../../model/chat'
import React, { Component } from 'react'
import { NavLink, Route, Switch, Redirect } from 'react-router-dom'
import './content.css'
import Message from './message/Message'
import Addresslist from './addresslist/Addresslist'
import Found from './found/Found'
import My from './my/My'
import { connect } from 'react-redux'
import axios from 'axios'
import Chat from '../../components/Chat'
import Scan from '../../components/scan/Scan'
import { List } from 'immutable'

class Content extends Component {
  switchMessage(type,msg,timeStamp){
    switch (type) {
      case "chat":
        // console.log("有一条来自"+msg.from+"的聊天消息")
        let list = List(this.props.MessageList)
        this.props.MessageList.forEach((item, index) => {
          if (item.username === msg.from) {  //当后端发送的消息中的from字段和状态中的username重合时，就增加一条话
            //   item.msg.push(msg.msg)
            list.update(index, item => {
              item.unread++
              item.msg.push({
                msg: msg.msg,
                type: "get",
                time: timeStamp
              })
            })
          }
        })
       this.props.setMessageList(list.toJS())
        break;
      case "validation":
       console.log("有一条验证消息",msg,this)
       var arr = [...this.props.validation]
       arr.push({
         username : msg.username,
         netname : msg.NetName
       })
       this.props.setvalidation(arr)   
       break;
      default:
        break;
    }
  }
  initData(){
    axios.get(`/users/getinitdata?username=${this.props.userinfo.username}`).then(res=>{
      this.props.updateaddressdata(res.data.friends)
      this.props.updatevalidationdata(res.data.validation)
    })
    
  }
  connectionChat = () => {
    var ws = new WebSocket('ws://127.0.0.1:8080');
    ws.onopen = () => {
      console.log("连接成功")
      ws.send(JSON.stringify({
        type: "connect",
        userinfo: this.props.userinfo.username
      }))
    }
    ws.onerror = function () {
      console.log("服务器连接失败")
    }

    ws.onmessage = (message) => {
      console.log(message)
      var msg = JSON.parse(message.data)
      this.switchMessage(msg.type,msg,message.timeStamp)
    }

  }
  countUnreadCount = () => {
    var count = 0;
    this.props.MessageList.forEach(item => {
      count += item.unread
    })
    return count;
  }
  componentDidMount = () => {
    this.connectionChat()
    this.initData()
    setInterval(() => {   //心跳体验
      ws.send(JSON.stringify({
        type: "ping"
      }))
    }, 3000);
  }
  render() {
    return (
      <div id="content">
        {
          this.props.headerisShow ?
            <header id="headerDom">
              <div className="header-box">
                <span style={{ position: "absolute", transform: "translateX(-50%)" }}>{this.props.headerTitle}</span>
                <Scan />
              </div>
            </header>
            :
            null
        }
        <main id="mainDom">
          <Switch>
            <Route path='/index/message' component={Message} />
            <Route path='/index/Chat/:haha' component={Chat} />
            <Route path='/index/addresslist' component={Addresslist} />
            <Route path='/index/found' component={Found} />
            <Route path='/index/my' component={My} />
            <Redirect from="/index" to="/index/message"></Redirect>
          </Switch>
        </main>
        {

          this.props.footerisshow ?
            <footer id="footerDom">
              <NavLink activeClassName="active" className="footnav" to="/index/message">
                <i className="iconfont">&#xe622;</i>
                <span>消息</span>
                {
                  this.countUnreadCount() === 0 ?
                    null
                    :
                    <div className="unread-count">{this.countUnreadCount()}</div>
                }
              </NavLink>
              <NavLink className="footnav" to="/index/addresslist">
                <i className="iconfont">&#xe63a;</i>
                <span>通讯录</span>
                {this.props.validation.length?<div className="red-dot"></div>:null}
              </NavLink>
              <NavLink className="footnav" to="/index/found"><i className="iconfont">&#xe621;</i><span>发现</span></NavLink>
              <NavLink className="footnav" to="/index/my"><i className="iconfont">&#xe678;</i><span>我</span></NavLink>
            </footer>
            :
            null
        }
        <div>

        </div>

      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    headerTitle: state.headerTitle,
    headerisShow: state.headerisShow,
    footerisshow: state.footerisshow,
    userinfo: state.userinfo,
    MessageList: state.messageList,
    validation : state.validation
  }
}

const mapDispatchToProps = {
  setMessageList: (data) => {
    return (dispatch) => {
      dispatch({
        type: "message",
        payload: [
          ...data
        ]
      })
    }
  },
  updateaddressdata : (data)=>{
    return (dispatch)=>{
      dispatch({
        type : "friendlist",
        payload : data
      })
    }
  },
  updatevalidationdata : (data)=>{
    return (dispatch)=>{
      dispatch({
        type : "validation",
        payload : data
      })
    }
  },
  setvalidation : (data)=>{
    return (dispatch)=>{
        dispatch({
            type : "validation",
            payload:data
        })
    }
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)