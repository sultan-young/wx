var express = require('express');
var router = express.Router();
var usModel = require('../mongodb/userinfoModel')
var fs = require('fs')
var store = require('../chatserver/store')

/* GET users listing. */

router.post('/login',function(req,res){
  usModel.find({
    username : req.body.username
  })
  .then(result => {
    if(result.length !== 0){
      if(req.body.password === result[0].password){
        res.send({
          err : 0,
          msg : "登录成功"
        })
      }else{
        res.send({
          err : 2,
          msg : "账号密码不匹配"
        })
      }
    }else{
      res.send({
        err : 1,
        msg : "没有该账号"
      })
    }
  })
})

router.post('/register',(req,res)=>{
  // console.log(req.body.file)
  let base64 = req.body.file.replace(/^data:image\/\w+;base64,/, "")
  //把图片转换成buffer对象
  let dataBuffer = new Buffer(base64, 'base64')
  //保存图片的地址是
  let path = 'public/uploads/header/'+req.body.username+'.jpg'
  //保存图片
  fs.writeFile(path,dataBuffer,(err) => {
      if(err) {
          console.log(err)
      }else {
          console.log('保存图片成功')
      }
  })
  usModel.find({
    username : req.body.username
  })
  .then(function(result){
    if(result.length !== 0){
      res.send({
        err : 1,
        msg : "该账号已经被注册！"
      })
    }else{
      usModel.create({
        username : req.body.username,
        password: req.body.password,
        email : req.body.email,
        photoPath : `/uploads/imgs/${req.body.username}.jpg`,
        netname : req.body.netname,
        signature : "这个人还未填写个性签名",
        friends : [{
          "username" : "111",
          "netname" : "小明"
      },
      {
          "username" : "222",
          "netname" : "小王"
      },
      {
          "username" : "333",
          "netname" : "小马"
      }],
        sex : -1

      })
      .then(_=>{
        res.send({
          err : 0,
          msg: "恭喜你，注册成功！"
        })
      })
    }
  })
})

router.get('/getuserinfo',(req,res)=>{
  usModel.find({
    username : req.query.username
  })
  .then(result => {
    // console.log(result)
    if(result.length !== 0){
      res.send({
        netname : result[0].netname
      })
    }
  })
})

router.get('/adduser',(req,res)=>{ //添加好友接口
  console.log(req.query)
  usModel.find({
    username: req.query.username
  }).then(result=>{
    console.log(result)
    if(result.length!==0){
      res.send({
        err : 0,
        msg : {
          username : result[0]["username"],
          netname : result[0]["netname"],
          signature : result[0]["signature"],
          sex : result[0]["sex"]
        }
      })
    }else{
      res.send({
        err : 1,
        msg : "没有该用户"
      })
    }
  })
})

router.post('/adduservalidation',(req,res)=>{  //发送验证请求接口
  // console.log(store.getState(),"------------")
  store.getState().forEach(item=>{
    if(item.id === req.body.username){  
      item.ws.send(JSON.stringify(
        {"username" : req.body.friendname,
        "NetName":req.body.netname,
        "msg":"好友验证",
        "type":"validation"}
      ))
    }
  })
  // console.log(req.body)
  usModel.update({
    username : req.body.username
  }
  ,{
    $push : {    //该句话的意思是将匹配的username集合中的validation数组push一个对象
      validation : {
        username : req.body.friendname,
        netname : req.body.netname
      }
    },
    
  }
  ).then(result=>{
    if(result["ok"]){
      res.send({
        err : 0
      })
    }
  })
})

router.get('/getinitdata',(req,res)=>{  //初始化好友列表，好友验证接口
  usModel.find({
    username : req.query.username
  }).then(result=>{
    console.log(result)
    if(result.length !== 0){
      res.send({
        friends : result[0]["friends"],
        validation: result[0]["validation"]
      })
    }
  })
})

router.post('/updatafriendsList',(req,res)=>{
  usModel.update({
    username : req.body.username,
  },{
    $push : {
      friends : req.body.data
    }
  }).then(result=>{
    if(result["ok"]){
      res.send({
        err : 0
      })
    }
  })
})

router.post('/updatavalidationlist',(req,res)=>{
  console.log(req.body,req.body.data.username)
  usModel.update({
    username : req.body.username,
  },{
    $pull : {
      "validation" : {"username":req.body.data.username}
    }
  }).then(result=>{
    if(result["ok"]){
      res.send({
        err : 0
      })
    }
  })
})

module.exports = router;
