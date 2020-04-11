const chatinfo = (prestate={
    from : "",
    to : "",
    toNetName : ""
},action)=>{
    var {type,payload} = action
    switch (type) {
        case "chat":
            var newstate = {...prestate,...payload}
            return newstate;
    
        default:
            return prestate;
    }
}

export default chatinfo