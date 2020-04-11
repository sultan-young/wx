import React,{Component} from 'react'
import {connect} from 'react-redux'
import ws from '../model/chat'
import {List} from  'immutable'
import './chat.css'
import Emoji from './emoji/Emoji'
import filterEmj from '../lib/filterEmj'

class Chat extends Component {
    state = {
        text : "",
        emjisshow : false,
        index : null
    }
    componentDidMount() {
        this.props.setfootnavhidden()
        this.props.setheaderhidden()
        this.updataUnreadmsg()
    }
    componentWillUnmount(){
        this.props.setfootnavshow()
        this.props.setheadershow()
    }
    updataUnreadmsg = ()=>{   //清除未读消息方法
        // console.log(props.messageList,props.chatuserinfo.toNetName)
        var imblist = List(this.props.messageList)
        this.props.messageList.forEach((item,index) => {
            if(item.netname === this.props.chatuserinfo.toNetName){
                this.setState({
                    index
                })
                imblist.update(index,value => {
                   value.unread = 0
                })
            }
        })
        this.props.updatamessage(imblist.toJS())
    }
   ChatHandler = ()=>{  //点击发送按钮后的函数
        var obj = {
            ...this.props.chatuserinfo,
            msg : this.state.text,
            type : "chat",  //表示是往聊天室的数组存入上线信息还是发送聊天内容
        }
        var imblist = List(this.props.messageList)
        this.props.messageList.forEach((item,index)=>{
           if( item.netname === this.props.chatuserinfo.toNetName){
               imblist.update(index,value=>{
                    value.msg.push({
                        msg: this.state.text,
                        type: "send",
                        time : new Date().getTime()
                    })
                    this.setState({
                        listData : imblist.toJS()[index].msg
                    })
               })
           }
        })
        this.props.updatamessage(imblist.toJS())
        ws.send(JSON.stringify(obj))
        this.setState({
            text : ""
        })
    }
    render() {
        return (
            <div id="chat">
                <div className="chat-header">
                    <span onClick={_=>{this.props.history.goBack()}}><i className="iconfont">&#xe65b;</i></span>  
                    <span>{this.props.chatuserinfo.toNetName}</span>
                    <span><i className="iconfont">&#xe748;</i></span>
                </div>    
                <div className="chat-box">
                {  
                    this.state.index === null ? null
                    :
                    this.props.messageList[this.state.index]["msg"].map(item => (
                       <div key={item.time} className={item.type==="get"?"chat-box-item-get" : "chat-box-item-send"}>
                           <div className="chat-photo-box">
                               <img alt="" src={`http://106.13.118.135:50000/uploads/header/${item.type==="get"?this.props.chatuserinfo.to:this.props.chatuserinfo.from}.jpg`}></img>
                           </div>
                           <div className="chat-info-box">
                               {/* <div className="chat-info-name">{listData.netname}</div> */}
                               <div className="chat-info-text">{filterEmj(item.msg)}</div>
                           </div>
                        </div>
                   ))
                  
                }
                </div>
                {
                    this.state.emjisshow ? 
                    <Emoji callback={(emj)=>{
                        this.setState({
                            text : this.state.text+emj
                        })
                        this.setState({
                            emjisshow : false
                        })
                    }}/>
                    :
                    null
                }
                <div className="chat-footer">
                        <div className="voice">
                         <i className="iconfont">&#xe618;</i>
                        </div>
                        <div className="chat-input">
                            <input value={this.state.text} onChange={(ev)=>{this.setState({text: ev.target.value})}} type="text"/>
                        </div>
                        <div className="chat-more-box">
                            <i onClick={_=>{this.setState({
                            emjisshow : !this.state.emjisshow
                        })}} className="iconfont chat-expression">&#xe604;</i>
                            <i onClick={ev=>{this.ChatHandler()}} className="iconfont chat-more">&#xe6a7;</i>
                        </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (store)=>{
    return {
        chatuserinfo : store.chatinfo,
        messageList : store.messageList
    }
}

const mapDispatchToProps = {
    setfootnavhidden : ()=>{
        return (dispatch)=>{
            dispatch({
                type : "footerisshow",
                payload : false
            })
        }
    },
    setfootnavshow : ()=>{
        return (dispatch)=>{
            dispatch({
                type : "footerisshow",
                payload : true
            })
        }
    },
    setheaderhidden : ()=>{
        return (dispatch)=>{
            dispatch({
                type : "headerisShow",
                payload : false
            })
        }
    },
    setheadershow : ()=>{
        return (dispatch)=>{
            dispatch({
                type : "headerisShow",
                payload : true
            })
        }
    },
    updatamessage : (data)=>{
        return (dispatch)=>{
            dispatch({
                type : "message",
                payload : data
            })
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Chat)