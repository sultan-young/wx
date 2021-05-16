import React, { Component } from 'react'
import Cancel from '../../components/Cancel'
import { List, InputItem ,Toast} from 'antd-mobile';
import { createForm } from 'rc-form';
import axios from 'axios'
import './login.css'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom';



class Login extends Component {
  handleClick = () => {
    this.inputRef.focus();
    // console.log(this.autoFocusInst.props.value,this.inputRef.props.value)
    axios.post("/users/login",{
      username : this.autoFocusInst.props.value,
      password : this.inputRef.props.value
    }).then(res => {
      if(!res.data.err){
        localStorage.setItem("login",true)
        axios.get(`/users/getuserinfo?username=${this.autoFocusInst.props.value}`)
        .then(res=>{
          this.props.setuserinfo(this.autoFocusInst.props.value,res.data.netname,`http://127.0.0.1:5001/uploads/header/${this.autoFocusInst.props.value}.jpg`)
          Toast.success('登录成功', 1,()=>{
            this.props.history.push("/index")
          })
        })
        
      }else if(res.data.err === 1){
        Toast.fail('没有该账号',2)
      }else if(res.data.err === 2){
        Toast.fail('账号密码不匹配',2)
      }
    })
  }
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div id="login">
        <Cancel></Cancel>
        <List className="loginform" renderHeader={() => '使用已有账号登录'}>
          <InputItem
            {...getFieldProps('autofocus')}
            clear
            placeholder="请输入账号"
            ref={el => this.autoFocusInst = el}
          >账号</InputItem>
          <InputItem
            {...getFieldProps('focus')}
            clear
            type="password"
            placeholder="请输入密码"
            ref={el => this.inputRef = el}
          >密码</InputItem>
          <List.Item>
            <div
              style={{ width: '100%', color: 'green', textAlign: 'center' }}
              onClick={this.handleClick}
            >
             登录
            </div>
          </List.Item>
        </List>
        <NavLink className="login-link" to="/register">还没有账号，点击注册</NavLink>
      </div>
    )
  }
}

const mapStateToProps = ()=>{
  return {

  }
}

const mapDispatchToProps = {
  setuserinfo : (username,netname,photopath)=>{
    return (dispatch)=>{
      dispatch({
        type : "userinfo",
        payload : {
          username,
          netname,
          photopath
        }
      })
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(createForm()(Login))