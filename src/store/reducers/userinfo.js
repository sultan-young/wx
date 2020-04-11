const userinfo = (prestate={
    username : "",
    photoPath : "",
    netname : ""
},action)=>{
    var {type,payload} = action;
    switch (type) {
        case "userinfo":
            let newstate = {...prestate}
            newstate = payload;
            return newstate        
        default:
            return prestate;
    }
}

export default userinfo