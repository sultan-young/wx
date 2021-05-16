import React,{useState} from 'react'
import { withRouter } from 'react-router-dom'
import { SearchBar,Button,Toast} from 'antd-mobile';
import {store} from '../../store/store'
import Axios from 'axios';
import {connect} from 'react-redux'
import './adduser.css'

function AddUser(props) {
    const [value,setvalue] = useState("")
    const [datalist,setDataList] = useState([])
    const [isshow,setIsshow] = useState(false)
    var submitFun = ()=>{
            Axios.get(`users/adduser?username=${value}`).then(res=>{
                if(!res.data.err){
                    // setDataList([...datalist].push(res.data.msg))
                    var newDataList = []
                    newDataList.push(res.data.msg)
                    setDataList(newDataList)
                    setIsshow(false)
                }else{
                    setIsshow(true)
                }
            })
            // setvalue("")
    }
    var onChange = (value)=>{
        setvalue(value)
    }
    var addFun = ()=>{
        // console.log(store.getState())
        Axios.post('/users/adduservalidation',{
            username : value,  //验证消息发给谁
            friendname : store.getState().userinfo.username,   //发送者的账号
            netname : store.getState().userinfo.netname  //发送者的网名
        }).then(res=>{
            if(!res.data.err){
                // setDataList([])
                setvalue("")
                Toast.info('发送好友请求成功', 2);
            }
            // console.log(res.data)
        })
    }
    var updatavalidation = (value,index)=>{  //value表示同意还是拒绝，index表示点击的哪个
        if(value){
            Axios.post(`/users/updatafriendsList`,{
                username : props.userinfo.username,
                data : props.validation[index]
            }).then(res=>{
                if(!res.data["err"]){
                    props.setaddressdata([...props.addressdata,props.validation[index]])
                    Axios.post(`/users/updatavalidationlist`,{
                        username : props.userinfo.username,
                        data : props.validation[index]
                    }).then(res=>{
                        if(!res.data["err"]){
                            var arr = [...props.validation]
                            arr.splice(index,1)
                            props.setvalidation(arr)   
                        }
                    })
                }
            })
        }else{  //点击拒绝后的分支
            Axios.post(`/users/updatavalidationlist`,{
                username : props.userinfo.username,
                data : props.validation[index]
            }).then(res=>{
                if(!res.data["err"]){
                    var arr = [...props.validation]
                    arr.splice(index,1)
                    props.setvalidation(arr)   
                }
            })
        }
    }
    return (
        <div>
            <header className="adduser-header">
                <span className="Add-goback" onClick={_ => props.history.goBack()}><i className="iconfont">&#xe65b;</i></span>
                <span>添加好友</span>
            </header>
            <SearchBar
                // value={this.state.value}
                placeholder="微信号"
                cancelText="查找"
                onChange = {onChange}
                onCancel={() => submitFun()}
                onSubmit={value => submitFun()}
                onClear={value => console.log(value, 'onClear')}
                value = {value}
                showCancelButton
            />
            {
                datalist.map(item => (
                    <div className="adduser-box" key={item.username}>
                        <div className="adduser-item-header">
                                <div className="adduser-item-photo">
                                  <img alt="" src={`http://127.0.0.1:5001/uploads/header/${item.username}.jpg`}/>
                                </div>
                                <div className="adduer-item-name">
                                    <span>用户名：{item.netname}</span>
                                    <div className="adduser-item-signature">个性签名：{item.signature}</div>
                                </div>
                                <div onClick={_=>{addFun()}} className="adduser-item-addbtn">
                                    <Button  style={{background:"green",color:"#fff"}} type="primary" inline size="small" disabled>添加到通讯录</Button>
                                </div>
                        </div>
                    </div>
                ))
            }
            {
                isshow ? 
                <div className="adduser-error">没有该用户</div>
                :
                null
            }
            {
                props.validation.map((item,index)=>(
                    <div className="adduser-box" key={item.username}>
                        <div className="adduser-item-header">
                                <div className="adduser-item-photo">
                                  <img alt="" src={`http://127.0.0.1:5001/uploads/header/${item.username}.jpg`}/>
                                </div>
                                <div className="adduer-item-name">
                                    <span>微信号：{item.username}</span>
                                    <div className="adduser-item-signature">呢名：{item.netname}</div>
                                </div>
                                <div  className="adduser-item-addbtn">
                                    <Button onClick={()=>{updatavalidation(1,index)}} style={{background:"green",color:"#fff"}} type="primary" inline size="small" >同意</Button>
                                    <Button onClick={()=>{updatavalidation(0,index)}}  style={{background:"#d93131",color:"#fff"}} type="primary" inline size="small" >拒绝</Button>
                                </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

const mapStateToProps=(state)=>{
    return {
        validation : state.validation,
        addressdata : state.addressdata,
        userinfo : state.userinfo
    }
}
const mapDispatchToProps={
    setaddressdata : (data)=>{
        return (dispatch)=>{
            dispatch({
                type : "friendlist",
                payload:data
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

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(AddUser))