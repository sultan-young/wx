const footerisshow = (prestate=true,action)=>{
    
    var {type,payload} = action
    switch (type) {
        case "footerisshow":
            return payload;
        default:
            return prestate;
    }
}

export default footerisshow