var {createStore} = require('redux')

const reducer = (prestate=[],action)=>{
    var {type,payload} = action;
    // console.log(action,111)
    switch (type) {
        case "arr":
            var newstate = [...payload]
            return newstate;
    
        default:
            return prestate;
    }
}

const store = createStore(reducer)

module.exports = store