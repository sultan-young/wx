const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
var store = require('../chatserver/store')


var arr = []

store.subscribe(()=>{  //redux的订阅方法，当store被改变时触发
  arr = store.getState()
})



var interval = null;
function heartbeat() {
  interval  = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
      // console.log(ws.isAlive)
      if (ws.isAlive === false) {
        // console.log("我要关闭你的连接")
        var i = null
        arr.forEach((item,index)=>{
          if(item.id === ws.id){  
            i = index;
          }        
        })
        arr.splice(i,1)
        store.dispatch({
          type: "arr",
          payload : arr
        })
        ws.terminate()
      };
      
      ws.isAlive = false;
      // ws.ping(noop);
    });
  }, 10000);
}

heartbeat()

wss.on('connection', function connection(ws) { 
  ws.isAlive = true;
  ws.on('message', function incoming(message) {
    // console.log(message)
    var msg = JSON.parse(message)
    let {type} = msg;
    switch (type) {
      case "connect":  //当用户第一次连接
        var obj = {
          id : msg.userinfo,
          ws
        }
        if(arr.length === 0){    //这个判断用于当用户刷新页面，ws会改变，此时把arr数组中的ws对象替换成新的ws
          // arr.push(obj)
          arr.push(obj)
          store.dispatch({
            type: "arr",
            payload : arr
          })
        }else{
         var flag =  arr.some(item => {
            return item.id === obj.id
          })
        if(flag){
          arr.forEach((item,index,arr) => {
            if(item.id === obj.id){
              arr[index] = obj           
            } 
          })
        }else{
          arr.push(obj)
          store.dispatch({
            type: "arr",
            payload : arr
          })
        }
        }
        // console.log(arr.length)
        break;
        case "chat":  //当用户发送消息
        console.log(message)
        arr.forEach(item=>{
          if(item.id === msg.to){  
            item.ws.send(message)
          }
        })
        break;
      case "ping":
        ws.isAlive = true;
        clearInterval(interval);
        heartbeat()
      break;
      default:
        break;
    }
    
  });
  
});

wss.on('close', function close() {
  clearInterval(interval);
});

