import React,{useEffect,useRef} from 'react'
import {store} from '../../../store/store'
import './template.css'

export default function Template(props) {
    const myboxbgcolor = useRef(null)
    useEffect(()=>{
    // console.log(props,myboxbgcolor)
    myboxbgcolor.current.style.background = props["i-bgcolor"]
    
    })
    return (
        <div onClick={_=>{
            props.onClick()
        }} className="template-box">
            <div ref={myboxbgcolor} className="template-box-i"> 
              <i className={`iconfont ${props.iconfont}`}></i>
            </div>
            <span className="">{props.title}
                
            </span>
            {
                store.getState().validation.length ?
                     <span style={{color : "green",fontSize:"12px"}}>你有新的好友请求</span> 
                     :
                      null
                }
        </div>
    )
}
