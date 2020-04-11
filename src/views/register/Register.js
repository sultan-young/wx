import React, { Component } from 'react'
import Cancel from '../../components/Cancel'
import { List, InputItem, ImagePicker} from 'antd-mobile';
import { createForm } from 'rc-form';
import axios from 'axios'
import './register.css'
import { NavLink } from 'react-router-dom';
const data = [
   
];
class Register extends Component {
    handleClick = () => {
        console.log(this.netname.props.value)
        if (!this.username.props.value || !this.password.props.value || !this.email.props.value || !this.portrait.props.files[0]) {
            alert("您有内容还未填写")
            return
        }
        axios.post("/users/register", {
            username: this.username.props.value,
            password: this.password.props.value,
            email: this.email.props.value,
            file : this.portrait.props.files[0].url,
            netname : this.netname.props.value
        }).then(res => {
            if(res.data.err === 1){
                alert(res.data.msg)
            }else{
                alert(res.data.msg)
            }
        })
    }
    state = {
        files: data,
        multiple: false,
    }
    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    }
    onSegChange = (e) => {
        const index = e.nativeEvent.selectedSegmentIndex;
        this.setState({
            multiple: index === 1,
        });
    }
    render() {
        const { getFieldProps } = this.props.form;

        return (
            <div id="register">
                <Cancel></Cancel>
                <List className="registerform" renderHeader={() => '填写信息进行注册'}>
                    <InputItem
                        {...getFieldProps('autofocus')}
                        clear
                        placeholder="请输入账号"
                        ref={el => this.username = el}
                    >账号</InputItem>
                    <InputItem
                        {...getFieldProps('focus')}
                        clear
                        type="password"
                        placeholder="请输入密码"
                        ref={el => this.password = el}
                    >密码</InputItem>
                    <InputItem
                        {...getFieldProps('netname')}
                        clear
                        placeholder="请输入呢名，用于对外展示的名称"
                        ref={el => this.netname = el}
                    >呢名</InputItem>
                    <InputItem
                        {...getFieldProps('email')}
                        clear
                        type="email"
                        placeholder="请输入邮箱，用于找回密码"
                        ref={el => this.email = el}
                    >邮箱</InputItem>
                    <div className="register-header">
                        <span>头像</span>
                        <ImagePicker
                            files={this.state.files}
                            onChange={this.onChange}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            selectable={this.state.files.length === 0}
                            disableDelete={this.state.files.length === 0}
                            multiple={false}
                            length = {1}
                            ref = {el => this.portrait = el}
                        />
                    </div>
                    <List.Item>
                        <div
                            style={{ width: '100%', color: 'green', textAlign: 'center' }}
                            onClick={this.handleClick}
                        >
                            注册
                </div>
                    </List.Item>
                </List>
                <NavLink className="login-link" to="/login">已有账号，直接登录</NavLink>


            </div>
        )
    }
}

export default createForm()(Register)