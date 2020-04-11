const messageList = (prestate = [{
        username: "111",
        msg: [{
            msg: "你在干啥呢[微笑][男孩]",
            type: "get",
            time : 1
        }, {
            msg: "你好啊",
            type: "send",
            time : 2
        }, {
            msg: "快点回话",
            type: "get",
            time : 3
        }],
        netname: "测试机器人一",
        unread: 1,
    },
    {
        username: "222",
        msg: [{
            msg: "老公你干啥呢",
            type: "get",
            time : 1
        },{
            msg: "喂喂喂",
            type: "get",
            time : 2
        },{
            msg: "你在干嘛呀",
            type: "get",
            time : 3
        }],
        netname: "测试机器人二",
        unread: 0,
    },
    {
        username: "333",
        msg: [{
            msg: "我是马总",
            type: "get",
            time : 1
        },{
            msg: "给你1000万",
            type: "get",
            time : 2
        },{
            msg: "来这里上班吧",
            type: "get",
            time : 3
        }],
        netname: "测试机器人三",
        unread: 0,
    }
], action) => {
    var {
        type,
        payload
    } = action;
    switch (type) {
        case "message":
            var newstate = [...payload]
            return newstate;

        default:
            return prestate;
    }
}

export default messageList