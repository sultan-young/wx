const headerisShow = (prestate=true,action)=>{
    
    var {type,payload} = action
    switch (type) {
        case "headerisShow":
            return payload;
        default:
            return prestate;
    }
}

export default headerisShow