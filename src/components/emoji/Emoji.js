import React, { Component } from 'react'
import {connect} from 'react-redux'
import './emojs.css'

 class Emoji extends Component {
    componentDidMount() {
        var dom = document.getElementsByClassName("chat-footer")[0]       
        this.refs.emj.style.bottom = dom.clientHeight + "px";
        this.setState({
            emj : this.props.emj
        })
        
    }
    state = {
        emj : []
    }
    render() {
        return (
            <div className="emj-box" ref="emj">
                {
                    this.state.emj.length !== 0?this.state.emj.map(item=>(
                        <li className="emg" onClick={_=>{
                            this.props.callback(item.text)
                        }} key={item.text}>{item.img}</li>
                    ))
                    :
                    null
                }
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        emj : state.emjlist
    }
}
export default connect(mapStateToProps)(Emoji)