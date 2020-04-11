import React, { Component } from 'react'
import {withRouter} from 'react-router'

class Cancel extends Component {
    render() {      
        return (
            <div style={{color:"green"}} onClick={()=>{this.props.history.push("/home")}}>取消
            </div>
        )
    }
}

export default withRouter(Cancel)