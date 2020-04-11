const validation = (prestate = [
  
], action) => {
var {
    type,
    payload
} = action;
switch (type) {
    case "validation":
        var newstate = [...payload]
        return newstate;

    default:
        return prestate;
}
}

export default validation