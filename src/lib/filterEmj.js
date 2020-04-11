import {store} from '../store/store'  //这个一个吧文字表情转变成emj表情的方法，通过正则
function filterEmj(data){
    var list = store.getState().emjlist;
    var text = data
    list.forEach(item=>{
        var str = '\\'+item.text.slice(0,item.text.length-1)+'\\'+item.text.slice(-1)
       var reg = new RegExp(str,'g')
       text = text.replace(reg,item.img)
    })
    return text
}

export default filterEmj;