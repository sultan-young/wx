var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var model = mongoose.model('userinfo',new Schema({
    username : String,
    password : String,
    email : String,
    name : String,
    photoPath : String,
    netname : String,
    signature : String, //个性签名
    friends : Array,
    sex : Number,
    validation : Array  //好友验证数组
}))

module.exports = model