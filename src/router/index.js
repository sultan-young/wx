import React, { Component } from 'react'
import { 
    HashRouter as Router,
    Route,
    Switch,
    Redirect
} from  'react-router-dom'
import Home from '../views/home/Home'
import Login from '../views/login/Login'
import Register from '../views/register/Register'
import Content from '../views/content/Content'
import Notfound from '../views/error/Notfound'
import AddUser from '../components/adduser/AddUser'
import Circle from '../components/circle/Circle'


export default class wxRouter extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route path='/add/adduser' component={AddUser}/>  
                    <Route path='/circle' component={Circle}/>  
                        {/* 添加好友路由 */}
                    <Route path="/index" render={()=>(
                        localStorage.getItem('login') === "true"?  //如果登陆过，就显示主页面
                        <Content></Content>
                        :
                        <Home></Home>
                        )} >
                    </Route>
                    <Redirect from="*" to="/index"></Redirect>
                    <Route path="/" component={Notfound}></Route>
                </Switch>
            </Router>
        )
    }
}
