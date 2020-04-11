const headerTitle = (prestate="",action)=>{
    var {type,payload} = action
    switch (type) {
        case "headerTitle":
            return payload;
        default:
            return prestate;
    }
}

export default headerTitle