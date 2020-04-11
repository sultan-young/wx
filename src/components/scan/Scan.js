import React, { Component } from 'react'
import { Popover, NavBar} from 'antd-mobile';
import {withRouter} from 'react-router-dom'
import './scan.css'

const Item = Popover.Item;

const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;

 class Scan extends Component {
    state = {
        visible : false
    };
    onSelect = (opt) => {
        this.setState({
            visible: false,
        });
        if(opt.key === "4"){
            this.addUserHandler()
            
        }else if(opt.key === "5"){
            this.scanHandler()
        }

    };
    handleVisibleChange = (visible) => {
        this.setState({
            visible,
        });
    };
    addUserHandler=()=>{
        // console.log("添加好友")
        this.props.history.push('/add/adduser')
    }
    scanHandler=()=>{
        // console.log("扫一扫")
    }
    render() {
        return (
            <div id="scan" >
                <NavBar
                    mode="light"
                    rightContent={
                        <Popover mask={false}
                            overlayClassName="fortest"
                            overlayStyle={{ color: 'currentColor' }}
                            visible={false}
                            overlay={[
                                (<Item key="4"  value="add" icon={<i className="iconfont">&#xe702;</i>} data-seed="logId">添加好友</Item>),
                                (<Item key="5" value="special" icon={myImg('PKAgAqZWJVNwKsAJSmXd')}  style={{ whiteSpace: 'nowrap' }}>扫一扫</Item>),
                                
                            ]}
                            align={{
                                overflow: { adjustY: 0, adjustX: 0 },
                                offset: [-10, 0],
                            }}
                            // onVisibleChange={this.handleVisibleChange}
                            onSelect={this.onSelect}
                        >
                            <div style={{
                                height: '100%',
                                padding: '0 15px',
                                marginRight: '-15px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            >
                                                <i className="iconfont">&#xe629;</i>

                            </div>
                        </Popover>
                    }
                >
                </NavBar>
            </div>
        )
    }
}


export default withRouter(Scan)