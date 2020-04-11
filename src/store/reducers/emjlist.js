const emglist = (prestate=[{
    img : "😀",
    text : "[微笑]"
  },{
      img : "😁",
      text : "[呲牙]"
    },
    {
      img : "😂",
      text : "[苦笑]"
    },
    {
      img : "😑",
      text : "[无语]"
    },{
      img : "😓",
      text : "[冷汗]"
    },{
      img : "😇",
      text : "[天使]"
    },{
      img : "😪",
      text : "[叹气]"
    },{
      img : "😭",
      text : "[大哭]"
    },{
      img : "😡",
      text : "[生气]"
    },{
      img : "👦",
      text : "[男孩]"
    },{
      img : "👧",
      text : "[女孩]"
    },{
      img : "👨",
      text : "[男人]"
    },{
      img : "👩",
      text : "[女人]"
    },{
      img : "👴",
      text : "[爷爷]"
    },{
      img : "👵",
      text : "[奶奶]"
    },{
      img : "👶",
      text : "[宝宝]"
    },{
      img : "👪",
      text : "[家庭]"
    },{
      img : "💪",
      text : "[力量]"
    },{
      img : "👈",
      text : "[想左]"
    },{
      img : "👉",
      text : "[向右]"
    },{
      img : "☝",
      text : "[向上]"
    },{
      img : "👇",
      text : "[向下]"
    },{
      img : "✌",
      text : "[胜利]"
    },{
      img : "✋",
      text : "[手掌]"
    },{
      img : "👌",
      text : "[ok]"
    },{
      img : "👍",
      text : "[拇指]"
    },{
      img : "👀",
      text : "[眼睛]"
    },{
      img : "👂",
      text : "[耳朵]"
    },{
      img : "👃",
      text : "[鼻子]"
    },{
      img : "👅",
      text : "[舌头]"
    },{
      img : "👄",
      text : "[嘴唇]"
    },{
      img : "🔞",
      text : "[18禁]"
    },
],action)=>{
    var {type,payload} = action
    switch (type) {
        case "emj":
            var newstate = [...prestate,...payload]
            return newstate;
        default:
            return prestate;
    }
}

export default emglist