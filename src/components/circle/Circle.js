import React from 'react'
import './circle.css'

export default function Circle(props) {
    return (
        <div>
            <header className="circle-box-header">
                <i onClick={_=>props.history.goBack()} className="iconfont">&#xe65b;</i>
                <span>朋友圈</span>
                <i style={{fontSize:"20px"}} className="iconfont">&#xe61a;</i>
            </header>
        </div>
    )
}
