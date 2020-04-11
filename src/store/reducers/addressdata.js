const addressdata = (prestate = [], action) => {
var {type,payload} = action;
switch (type) {
    case "friendlist":
        var newstate = [...payload]
        return newstate;
    default:
        return prestate;
}
}

export default addressdata