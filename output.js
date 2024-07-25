//Thu Jul 25 2024 07:01:23 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
//Thu Jul 25 2024 06:55:25 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("\u5927\u724C\u8054\u54080725");
const jdCookie = require("./jdCookie"),
  common = require("./utils/Rebels_jdCommon"),
  notify = require("./utils/Rebels_sendJDNotify"),
  getToken = require("./utils/Rebels_Token"),
  CryptoJS = require("crypto-js"),
  activityUrl = process.env.jd_dplh_url || "235d65e8e47143229b3c0a7f_240725",
  dplh_viewShop = process.env.jd_dplh_viewShop === "true",
  dplh_AddCart = process.env.jd_dplh_addCart === "true",
  dplh_draw = process.env.jd_dplh_draw || 5,
  dplh_wait = process.env.jd_dplh_wait || 1,
  isNotify = process.env.jd_dplh_Notify === "true",
  hotbreak = process.env.jd_dplh_break === "true";
let waitTimes = parseInt(dplh_wait) * 1000;
const prize_type = {
  jdMarket: "[\u4EAC\u8C46]",
  coin: "[\u91D1\u5E01]",
  point: "[\u79EF\u5206]",
  integral: "[\u79EF\u5206]",
  goods: "[\u5B9E\u7269]",
  product: "[\u5E7F\u544A]",
  coupon: "[\u4F18\u60E0\u5238]",
  chance: "[\u6B21\u6570]",
  card: "[\u5361\u7247]"
};
let cookie = "",
  originCookie = "",
  cookiesArr = Object.keys(jdCookie).map(_0x26a09d => jdCookie[_0x26a09d]).filter(_0x420e3d => _0x420e3d);
!cookiesArr[0] && ($.msg($.name, "\u3010\u63D0\u793A\u3011\u8BF7\u5148\u83B7\u53D6Cookie"), process.exit(1));
$.blacklist = process.env.jd_dplh_blacklist || "";
getBlacklist();
$.errMsgPin = [];
$.errOpencard = [];
!(async () => {
  console.log("==========" + $.name + "\u53D8\u91CF\u5F00\u542F\u72B6\u6001==========");
  console.log("\u5F00\u5361\u7C7B\u6D3B\u52A8\u4E0D\u4F1A\u81EA\u52A8\u8FD0\u884C\uFF0C\u8BF7\u81EA\u884C\u6D4B\u8BD5\u662F\u5426\u6709\u6C34");
  console.log("\u4EE3\u7406\u5F00\u5173: [" + common.getProxyStatus() + "]");
  console.log("\u95F4\u9694\u65F6\u957F: [" + (waitTimes === 0 ? "\u65E0" : waitTimes / 1000 + "\u79D2") + "]\u8FD0\u884C\u95F4\u9694\u65F6\u957F");
  console.log("\u6D4F\u89C8\u4EFB\u52A1: [" + (dplh_viewShop ? "\u5F00\u542F" : "\u5173\u95ED") + "]");
  console.log("\u52A0\u8D2D\u4EFB\u52A1: [" + (dplh_AddCart ? "\u5F00\u542F" : "\u5173\u95ED") + "]");
  console.log("IP\u9650\u5236\u540E\u7EE7\u7EED\u6267\u884C: [" + (hotbreak ? "\u5F00\u542F" : "\u5173\u95ED") + "]");
  console.log("==========" + $.name + "\u53D8\u91CF\u72B6\u6001\u7ED3\u675F==========");
  if (!activityUrl) {
    console.log("\u26A0 \u8BF7\u5148\u5B9A\u4E49\u5FC5\u8981\u7684\u73AF\u5883\u53D8\u91CF\u540E\u518D\u8FD0\u884C\u811A\u672C");
    return;
  }
  authorCodeList = await getAuthorCodeList("http://code.257999.xyz/jd_dplh.json");
  authorCodeList ? (console.log("\n\u670D\u52A1\u72B6\u6001\u6B63\u5E38\uFF0C\u6D3B\u52A8\u83B7\u53D6\u6210\u529F"), $.authorCode = authorCodeList[random(0, authorCodeList.length)]) : ($.authorCode = "", console.log("\n\u670D\u52A1\u72B6\u6001\u5F02\u5E38\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u662F\u5426\u6B63\u5E38\n"));
  $.activityUrl = activityUrl;
  $.activityUrl && ($.activityUrl.includes("actId=") ? $.activityId = common.getUrlParameter(activityUrl, "actId") : $.activityId = $.activityUrl);
  $.hostname = "jinggengjcq-isv.isvjcloud.com";
  $.baseUrl = "https://" + $.hostname;
  if (!$.activityId) {
    console.log("\u26A0 \u8BF7\u586B\u5199\u683C\u5F0F\u6B63\u786E\u7684\u53D8\u91CF");
    return;
  }
  notify.config({
    title: $.name
  });
  $.userId = "10299171";
  $.inviteNick = $.authorCode;
  const _0x4fc9c9 = process.env.WX_ADDRESS ? process.env.WX_ADDRESS : "";
  if (_0x4fc9c9 && _0x4fc9c9 != "") {
    const _0xd7694d = _0x4fc9c9.split("|");
    $.randNum = Math.floor(Math.random() * _0xd7694d.length);
    if (_0xd7694d[$.randNum] === "") {
      console.log("\u274C \u968F\u673A\u62BD\u53D6\u5230\u7684\u6536\u8D27\u5730\u5740\u4FE1\u606F\u4E3A\u7A7A\uFF0C\u8BF7\u6B63\u786E\u4F7F\u7528 \"|\" \u7BA1\u9053\u7B26\u4EE5\u7528\u4E8E\u5206\u5272\u591A\u4E2A\u6536\u8D27\u5730\u5740\uFF01\n");
      return false;
    }
    const [_0x178f72, _0x2fbb79, _0x3274a0, _0x31d483, _0x10ef16, _0x3644db] = _0xd7694d[$.randNum].split("@");
    for (let _0x12bf0c = 0; _0x12bf0c < 6; _0x12bf0c++) {
      if (_0xd7694d[_0x12bf0c] === "") {
        console.log("\u274C \u968F\u673A\u62BD\u53D6\u5230\u7684\u6536\u8D27\u5730\u5740\u4FE1\u606F\u683C\u5F0F\u5B58\u5728\u9519\u8BEF\uFF08\u53C2\u6570\u4E0D\u80FD\u4E3A\u7A7A\uFF09\n");
        return false;
      }
    }
    $.receiver = _0x178f72;
    $.phone = _0x2fbb79;
    $.province = _0x3274a0;
    $.city = _0x31d483;
    $.county = _0x10ef16;
    $.address = _0x3644db;
  }
  for (let _0x24b222 = 0; _0x24b222 < cookiesArr.length; _0x24b222++) {
    $.index = _0x24b222 + 1;
    cookie = cookiesArr[_0x24b222];
    originCookie = cookiesArr[_0x24b222];
    common.setCookie(originCookie);
    $.UserName = decodeURIComponent(common.getCookieValue(cookie, "pt_pin"));
    $.UA = common.genUA($.UserName);
    $.message = notify.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******\u5F00\u59CB\u3010\u4EAC\u4E1C\u8D26\u53F7" + $.index + "\u3011" + ($.nickName || $.UserName) + "******\n");
    await Main();
    common.unsetCookie();
    if ($.outFlag || $.runEnd) {
      break;
    }
  }
  if ($.errMsgPin.length > 0) {
    let _0x1001ba = "\n\u4EE5\u4E0B\u8D26\u53F7\u53EF\u80FD\u662F\u706B\u7206\uFF0C\u8BF7\u52A0\u5165\u9ED1\u540D\u5355\nexport jd_dplh_blacklist=\"" + $.errMsgPin.join("&") + "\"";
    console.log(_0x1001ba);
  }
  if ($.errOpencard.length > 0) {
    let _0x2bc94a = "\n\u4EE5\u4E0B\u8D26\u53F7\u5F00\u5361\u706B\u7206\uFF0C\u8BF7\u81EA\u884C\u51B3\u5B9A\u662F\u5426\u52A0\u5165\u9ED1\u540D\u5355\n\"" + $.errOpencard.join("&") + "\"";
    console.log(_0x2bc94a);
  }
  isNotify && notify.getMessage() && (notify.appendContent("\n\u3010\u6D3B\u52A8ID\u3011" + $.activityId), await notify.push());
})().catch(_0xb388a5 => $.logErr(_0xb388a5)).finally(() => $.done());
async function Main() {
  try {
    $.skipRun = false;
    $.open_draw = false;
    $.jdToken = "";
    if ($.runEnd || $.outFlag) {
      return;
    }
    $.jdToken = await getToken(originCookie, $.baseUrl);
    if (!$.jdToken) {
      console.log("\u83B7\u53D6 Token \u5931\u8D25\uFF01");
      $.message.fix("\u83B7\u53D6[Token]\u5931\u8D25");
      return;
    }
    $.activityload = "";
    await sendRequest("activity_load");
    if ($.MixNick == "") {
      console.log("\u83B7\u53D6[\u6D3B\u52A8\u4FE1\u606F]\u5931\u8D25\uFF0C\u53EF\u80FD\u662F\u9ED1\u53F7\u6216\u8005\u592A\u5361\u4E86");
      return;
    }
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    if (!$.hasGetBasicInfo) {
      $.hasGetBasicInfo = true;
      const _0x395f0b = $.time("yyyy-MM-dd HH:mm", $.startTime),
        _0x13a78c = $.time("yyyy-MM-dd HH:mm", $.endTime);
      console.log("\u6D3B\u52A8\u540D\u79F0\uFF1A#\u8054\u5408\u5F00\u5361[" + $.activityId + "]\n\u5F00\u59CB\u65F6\u95F4\uFF1A" + _0x395f0b + "\n\u7ED3\u675F\u65F6\u95F4\uFF1A" + _0x13a78c);
      notify.appendContent("\u6D3B\u52A8\u540D\u79F0\uFF1A#\u8054\u5408\u5F00\u5361[" + $.activityId + "]\n\u5F00\u59CB\u65F6\u95F4\uFF1A" + _0x395f0b + "\n\u7ED3\u675F\u65F6\u95F4\uFF1A" + _0x13a78c);
      const _0x2585f8 = Date.now();
      if ($.startTime && _0x2585f8 < $.startTime) {
        console.log("\u6D3B\u52A8\u5C06\u5728 " + _0x395f0b + " \u5F00\u59CB\uFF0C\u665A\u70B9\u518D\u6765\u5427~");
        $.message.fix("\u6D3B\u52A8\u5C1A\u672A\u5F00\u59CB\uFF0C\u5F00\u59CB\u65F6\u95F4\uFF1A" + _0x395f0b);
        $.runEnd = true;
        return;
      }
      if ($.endTime && _0x2585f8 > $.endTime) {
        console.log("\u6D3B\u52A8\u5DF2\u4E8E " + _0x13a78c + " \u7ED3\u675F\uFF0C\u4E0B\u6B21\u65E9\u70B9\u6765\u5427~");
        $.message.fix("\u6D3B\u52A8\u5DF2\u7ED3\u675F\uFF0C\u7ED3\u675F\u65F6\u95F4\uFF1A" + _0x13a78c);
        $.runEnd = true;
        return;
      }
    }
    console.log("\u8D26\u53F7\u6D3B\u52A8\u4FE1\u606F\uFF1A\n\u52A9\u529B\u7801\uFF1A[" + $.MixNick + "]\n");
    $.inviteNick && (await sendRequest("\u7ED1\u5B9A"), await $.wait(parseInt(waitTimes * 1 + 100, 10)));
    if ($.runEnd || $.outFlag) {
      return;
    }
    $.shopList = "";
    await sendRequest("shopList");
    await $.wait(parseInt(waitTimes * 1 + 100, 10));
    if ($.shopList) {
      let _0x107d51 = ($.shopList || []).filter(_0x98a89a => _0x98a89a.open == false);
      console.log("\u5171\u6709" + $.shopList.length + "\u5F20\u5361,\u8FD8\u9700\u5F00" + _0x107d51.length + "\u5F20\u5361");
      for (let _0x5aead0 of _0x107d51 || []) {
        if (!_0x5aead0.open) {
          $.missionType = "openCard";
          $.openUrl = _0x5aead0.openCardUrl;
          $.shopTitle = _0x5aead0.shopTitle;
          $.dplhVenderId = _0x5aead0.userId;
          $.joinVenderId = common.getUrlParameter($.openUrl, "venderId");
          (!$.openUrl || !/^\d+$/.test($.joinVenderId)) && ($.joinVenderId = _0x5aead0.userId);
          await sendRequest("mission");
          await $.wait(parseInt(waitTimes * 1 + 1000, 10));
          const _0x22e4c4 = await common.joinShopMember($.joinVenderId);
          if (_0x22e4c4) {
            console.log("\u52A0\u5165[" + $.shopTitle + "]\u5E97\u94FA\u4F1A\u5458\u6210\u529F");
            await $.wait(parseInt(waitTimes * 1 + 100, 10));
          } else {
            console.log("[" + $.shopTitle + "]\u5E97\u94FA\u5F00\u5361\u5931\u8D25,\u8DF3\u8FC7\u6267\u884C~");
            break;
          }
          await sendRequest("activity_load");
          await $.wait(parseInt(waitTimes * 1 + 100, 10));
          $.dplhVenderId = "";
        }
      }
    }
    $.hasCollectShop == 0 && ($.missionType = "uniteCollectShop", await sendRequest("mission"), await $.wait(parseInt(waitTimes * 1 + 1000, 10)));
    dplh_AddCart ? $.hasAddCart == 0 && ($.missionType = "uniteAddCart", await sendRequest("mission"), await $.wait(parseInt(waitTimes * 1 + 1000, 10))) : console.log("\u672A\u8BBE\u7F6E\u52A0\u8D2D\u4EFB\u52A1\u53D8\u91CF\uFF0C\u4E0D\u6267\u884C\u52A0\u8D2D\u4EFB\u52A1\n");
    if (dplh_viewShop) {
      if ($.shopList) {
        for (let _0x29a93e of $.shopList || []) {
          $.missionType = "viewShop";
          $.goodsNumId = _0x29a93e.userId;
          await sendRequest("mission");
          await $.wait(parseInt(waitTimes * 1 + 2000, 10));
        }
      }
    } else {
      console.log("\u672A\u8BBE\u7F6E\u6D4F\u89C8\u4EFB\u52A1\u53D8\u91CF\uFF0C\u4E0D\u6267\u884C\u6D4F\u89C8\u4EFB\u52A1\n");
    }
    await sendRequest("list");
    await $.wait(parseInt(waitTimes * 1 + 100, 10));
    if (dplh_draw != 0) {
      if ($.open_draw) {
        let _0x4fc742 = parseInt($.remainPoint / 200);
        if (_0x4fc742 > dplh_draw) {
          _0x4fc742 = dplh_draw;
        }
        console.log("\u8BBE\u5B9A\u62BD\u5956\u6B21\u6570\u4E3A:" + _0x4fc742 + "\uFF0C\u5F53\u524D\u79EF\u5206\uFF1A" + $.remainPoint);
        for (m = 1; _0x4fc742--; m++) {
          console.log("\u7B2C" + m + "\u6B21\u62BD\u5956");
          await $.wait(parseInt(waitTimes * 1 + 3000, 10));
          await sendRequest("\u62BD\u5956");
          if (Number(_0x4fc742) <= 0) {
            break;
          }
          if (m >= 10) {
            console.log("\u62BD\u5956\u592A\u591A\u6B21\uFF0C\u591A\u4F59\u7684\u6B21\u6570\u8BF7\u518D\u6267\u884C\u811A\u672C");
            break;
          }
          await $.wait(parseInt(waitTimes * 1 + 3000, 10));
        }
      }
    }
    console.log("\u5F53\u524D\u52A9\u529B:[" + ($.inviteNick || "\u672A\u83B7\u53D6\u5230\u6570\u636E") + "]");
    $.index == 1 && ($.inviteNick = $.MixNick, console.log("\u540E\u9762\u90FD\u52A9\u529B:[" + $.inviteNick + "]"));
    await $.wait(parseInt(waitTimes * 1 + 100, 10));
  } catch (_0x42bfa5) {
    console.log("\u274C \u811A\u672C\u8FD0\u884C\u9047\u5230\u4E86\u9519\u8BEF\n" + _0x42bfa5);
  }
}
async function handleResponse(_0x4ba7a4, _0xcf9f08) {
  try {
    switch (_0x4ba7a4) {
      case "activity_load":
        if (_0xcf9f08.success && _0xcf9f08.data?.["status"] == 200) {
          $.activityload = _0xcf9f08?.["data"]?.["data"];
          $.startTime = $.activityload?.["cusActivity"]?.["startTime"];
          $.endTime = $.activityload?.["cusActivity"]?.["endTime"];
          $.awardTime = $.activityload?.["cusActivity"]?.["awardTime"];
          $.MixNick = $.activityload?.["missionCustomer"]?.["buyerNick"];
          $.totalChance = $.activityload?.["missionCustomer"]?.["totalChance"];
          $.usedChance = $.activityload?.["missionCustomer"]?.["usedChance"];
          $.remainChance = $.activityload?.["missionCustomer"]?.["remainChance"];
          $.totalPoint = $.activityload?.["missionCustomer"]?.["totalPoint"];
          $.usedPoint = $.activityload?.["missionCustomer"]?.["usedPoint"];
          $.remainPoint = $.activityload?.["missionCustomer"]?.["remainPoint"];
          $.hasCollectShop = $.activityload?.["missionCustomer"]?.["hasCollectShop"];
          $.hasAddCart = $.activityload?.["missionCustomer"]?.["hasAddCart"];
          $.openCardStatus = $.activityload?.["openCardStatus"] || false;
          $.isGetRankGoods = $.activityload?.["isGetRankGoods"] || false;
          if ($.activityload?.["openCardMsg"]) {
            console.log($.activityload?.["openCardMsg"]);
          }
        } else {
          _0xcf9f08.data?.["status"] == 500 ? (console.log("" + _0xcf9f08.errorMessage), $.errMsgPin.push($.UserName), $.message.fix("" + _0xcf9f08.errorMessage), $.skipRun = true) : console.log("\u2753" + _0x4ba7a4 + " " + JSON.stringify(_0xcf9f08));
        }
        break;
      case "\u7ED1\u5B9A":
        if (_0xcf9f08.success && _0xcf9f08.data?.["status"] == 200) {
          console.log("" + _0xcf9f08.data?.["msg"]);
        } else {
          _0xcf9f08.data?.["status"] == 500 ? (console.log("" + _0xcf9f08.errorMessage), ["\u7ED3\u675F", "\u5F00\u59CB"].some(_0x32a798 => _0xcf9f08.errorMessage.includes(_0x32a798)) && ($.runEnd = true)) : console.log("\u2753" + _0x4ba7a4 + " " + JSON.stringify(_0xcf9f08));
        }
        break;
      case "shopList":
        if (_0xcf9f08.success && _0xcf9f08.data?.["status"] == 200) {
          $.shopList = _0xcf9f08?.["data"]?.["data"] || [];
        } else {
          _0xcf9f08.data?.["status"] == 500 ? console.log("" + _0xcf9f08.errorMessage) : console.log("\u2753" + _0x4ba7a4 + " " + JSON.stringify(_0xcf9f08));
        }
        break;
      case "mission":
        if (_0xcf9f08.success && _0xcf9f08.data?.["status"] == 200) {
          $.mission = _0xcf9f08?.["data"]?.["data"];
          console.log("" + (_0xcf9f08.msg || $.mission?.["remark"] || ""));
          $.message.fix("" + (_0xcf9f08.msg || $.mission?.["remark"] || ""));
        } else {
          _0xcf9f08.data?.["status"] == 500 ? console.log("" + _0xcf9f08.errorMessage) : console.log("\u2753" + _0x4ba7a4 + " " + JSON.stringify(_0xcf9f08));
        }
        break;
      case "getAwardSettingList":
        if (_0xcf9f08.success && _0xcf9f08.data?.["status"] == 200) {
          $.getAwardSettingList = _0xcf9f08?.["data"]?.["data"]?.["awardSettings"];
        } else {
          _0xcf9f08.data?.["status"] == 500 ? console.log("" + _0xcf9f08.errorMessage) : console.log("\u2753" + _0x4ba7a4 + " " + JSON.stringify(_0xcf9f08));
        }
        break;
      case "exchangePost":
        if (_0xcf9f08.success && _0xcf9f08.data?.["status"] == 200) {
          $.exchangesuccess = true;
          $.exchangePost = _0xcf9f08?.["data"]?.["data"];
          let _0x3ede99 = $.exchangePost?.["awardSendLog"],
            _0x33bbd4 = _0x3ede99?.["awardType"];
          switch (_0x33bbd4) {
            case "jdMarket":
              console.log("\uD83C\uDF89 " + _0x3ede99?.["awardName"] + " \uD83D\uDC36");
              $.message.fix("\uD83C\uDF89 " + _0x3ede99?.["awardName"] + " \uD83D\uDC36");
              break;
            case "point":
            case "integral":
              console.log("\uD83D\uDDD1\uFE0F " + _0x3ede99?.["awardName"] + "  \uD83C\uDF9F\uFE0F");
              $.message.fix("\uD83D\uDDD1\uFE0F " + _0x3ede99?.["awardName"] + "  \uD83C\uDF9F\uFE0F");
              break;
            case "goods":
              $.generateId = _0x3ede99?.["id"];
              $.prizeShiWu = _0x3ede99?.["awardName"];
              console.log("\uD83C\uDF89 \u606D\u559C\u83B7\u5F97\u5B9E\u7269~");
              console.log("\u5956\u54C1\u540D\u79F0\uFF1A" + $.prizeShiWu);
              if (_0x3ede99?.["awardPic"]) {
                console.log("\u9884\u89C8\u56FE\u7247\uFF1A" + _0x3ede99?.["awardPic"]);
              }
              $.message.fix("\uD83C\uDF89 \u606D\u559C\u83B7\u5F97\u5B9E\u7269\uFF0C\u5956\u54C1\u540D\u79F0\uFF1A" + $.prizeShiWu);
              process.env.WX_ADDRESS && (await sendRequest("updateAddress"), await $.wait(4000));
              break;
            case "coin":
            case "product":
            case "coupon":
            case "chance":
            case "card":
              console.log("\uD83D\uDDD1\uFE0F " + prize_type[prizeType]);
              break;
            default:
              console.log(_0x33bbd4 + " \u6682\u65F6\u672A\u6536\u5F55\uFF0C\u8BF7\u8054\u7CFB\u4F5C\u8005\u6DFB\u52A0\n");
              console.log("" + JSON.stringify($.exchangePost));
          }
        } else {
          _0xcf9f08.data?.["status"] == 500 ? console.log("" + _0xcf9f08.errorMessage) : console.log("\u2753" + _0x4ba7a4 + " " + JSON.stringify(_0xcf9f08));
        }
        break;
      case "inviteList":
        if (_0xcf9f08.success && _0xcf9f08.data?.["status"] == 200) {
          $.inviteList = _0xcf9f08?.["data"]?.["data"];
        } else {
          _0xcf9f08.data?.["status"] == 500 ? console.log("" + _0xcf9f08.errorMessage) : console.log("\u2753" + _0x4ba7a4 + " " + JSON.stringify(_0xcf9f08));
        }
        break;
      case "list":
        if (_0xcf9f08.success && _0xcf9f08.data?.["status"] == 200) {
          let _0x38d96c = 0;
          for (let _0x20e827 in _0xcf9f08.data.data.list || []) {
            let _0xb0285b = _0xcf9f08.data.data.list[_0x20e827];
            _0x38d96c += Number(_0xb0285b.awardDes);
          }
          if (_0x38d96c > 0) {
            console.log("\u67E5\u8BE2\u5956\u52B1\u6210\u529F\uFF0C\u7D2F\u8BA1\u83B7\u5F97" + _0x38d96c + "\u4EAC\u8C46\n");
          }
        } else {
          _0xcf9f08.data?.["status"] == 500 ? console.log("" + _0xcf9f08.errorMessage) : console.log("\u2753" + _0x4ba7a4 + " " + JSON.stringify(_0xcf9f08));
        }
        break;
      case "updateAddress":
        if (_0xcf9f08.success && _0xcf9f08.data?.["status"] == 200) {
          _0xcf9f08?.["data"]?.["data"]?.["result"] ? (console.log("\u5DF2\u63D0\u4EA4\u6536\u8D27\u5730\u5740 \u2705\n\u767B\u8BB0\u4E3A\u968F\u673A\u62BD\u53D6\u5230\u7684\u7B2C" + ($.randNum + 1) + "\u5957\u6536\u8D27\u5730\u5740\u4FE1\u606F\n\u8054\u7CFB\u4FE1\u606F\uFF1A" + $.receiver + " (" + $.phone.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "\uFF09\n"), !isNotify && (await notify.sendNotify($.name + "\u4E2D\u5956\u901A\u77E5", "\u3010\u4EAC\u4E1C\u8D26\u53F7" + $.index + "\u3011" + $.nickName + "\n\u62BD\u4E2D\u5B9E\u7269 " + $.prizeShiWu + "\uFF0C\u5DF2\u6210\u529F\u81EA\u52A8\u767B\u8BB0\u6536\u8D27\u5730\u5740\n\n\u6D3B\u52A8ID\uFF1A" + $.activityId)), $.message.insert($.prizeShiWu + "(\u5DF2\u586B\u5730\u5740)\uD83C\uDF81")) : console.log(_0xcf9f08.data.data);
        } else {
          _0xcf9f08.data?.["status"] == 500 ? console.log("" + _0xcf9f08.errorMessage) : console.log("\u2753" + _0x4ba7a4 + " " + JSON.stringify(_0xcf9f08));
        }
        break;
      case "\u62BD\u5956":
        console.log("\u2753" + _0x4ba7a4 + " " + JSON.stringify(_0xcf9f08));
        if (_0xcf9f08.success && _0xcf9f08.data?.["status"] == 200) {
          $.dplhdraw = _0xcf9f08?.["data"]?.["data"];
          let _0x16ad40 = $.dplhdraw?.["awardSendLog"],
            _0x325127 = _0x16ad40?.["awardType"];
          switch (_0x325127) {
            case "jdMarket":
              console.log("\uD83C\uDF89 " + _0x16ad40?.["awardName"] + " \uD83D\uDC36");
              $.message.fix("\uD83C\uDF89 " + _0x16ad40?.["awardName"] + " \uD83D\uDC36");
              break;
            case "point":
            case "integral":
              console.log("\uD83D\uDDD1\uFE0F " + _0x16ad40?.["awardName"] + "  \uD83C\uDF9F\uFE0F");
              $.message.fix("\uD83D\uDDD1\uFE0F " + _0x16ad40?.["awardName"] + "  \uD83C\uDF9F\uFE0F");
              break;
            case "goods":
              $.generateId = _0x16ad40?.["id"];
              $.prizeShiWu = _0x16ad40?.["awardName"];
              console.log("\uD83C\uDF89 \u606D\u559C\u83B7\u5F97\u5B9E\u7269~");
              console.log("\u5956\u54C1\u540D\u79F0\uFF1A" + $.prizeShiWu);
              if (_0x16ad40?.["awardPic"]) {
                console.log("\u9884\u89C8\u56FE\u7247\uFF1A" + _0x16ad40?.["awardPic"]);
              }
              $.message.fix("\uD83C\uDF89 \u606D\u559C\u83B7\u5F97\u5B9E\u7269\uFF0C\u5956\u54C1\u540D\u79F0\uFF1A" + $.prizeShiWu);
              process.env.WX_ADDRESS && (await sendRequest("updateAddress"), await $.wait(4000));
              break;
            case "coin":
            case "product":
            case "coupon":
            case "chance":
            case "card":
              console.log("\uD83D\uDDD1\uFE0F " + prize_type[_0x325127]);
              break;
            default:
              console.log(_0x325127 + " \u6682\u65F6\u672A\u6536\u5F55\uFF0C\u8BF7\u8054\u7CFB\u4F5C\u8005\u6DFB\u52A0\n");
              console.log("" + JSON.stringify($.exchangePost));
          }
        } else {
          _0xcf9f08.data?.["status"] == 500 ? console.log("" + _0xcf9f08.errorMessage) : console.log("\u2753" + _0x4ba7a4 + " " + JSON.stringify(_0xcf9f08));
        }
        break;
    }
  } catch (_0x4eb389) {
    console.log("\u274C \u672A\u80FD\u6B63\u786E\u5904\u7406 " + _0x4ba7a4 + " \u8BF7\u6C42\u54CD\u5E94 " + (_0x4eb389.message || _0x4eb389));
  }
}
async function sendRequest(_0x573c4f) {
  if ($.runEnd || $.outFlag) {
    return;
  }
  let _0x49ac39 = $.baseUrl,
    _0x511253 = null,
    _0x363bf4 = null,
    _0x4a22a9 = "POST";
  switch (_0x573c4f) {
    case "activity_load":
      _0x49ac39 += "/dm/front/jdJoinCardtf/activity/load";
      _0x363bf4 = {
        open_id: "",
        mix_nick: $.MixNick || "",
        user_id: $.userId
      };
      _0x511253 = getSignBody("/jdJoinCardtf/activity/load", Object.assign({
        jdToken: $.jdToken,
        source: "01",
        inviteNick: $.inviteNick || ""
      }, $.dplhVenderId ? {
        shopId: "" + $.dplhVenderId
      } : {}));
      break;
    case "shopList":
      _0x49ac39 += "/dm/front/jdJoinCardtf/shop/shopList";
      _0x363bf4 = {
        open_id: "",
        mix_nick: $.MixNick || "",
        user_id: $.userId
      };
      _0x511253 = getSignBody("/jdJoinCardtf/shop/shopList", {});
      break;
    case "\u7ED1\u5B9A":
      _0x49ac39 += "/dm/front/jdJoinCardtf/customer/inviteRelation";
      _0x363bf4 = {
        open_id: "",
        mix_nick: $.MixNick || "",
        user_id: $.userId
      };
      _0x511253 = getSignBody("/jdJoinCardtf/customer/inviteRelation", {
        inviterNick: $.inviteNick || ""
      });
      break;
    case "mission":
      _0x49ac39 += "/dm/front/jdJoinCardtf/mission/completeMission";
      _0x363bf4 = {
        open_id: "",
        mix_nick: $.MixNick || "",
        user_id: $.userId
      };
      _0x511253 = getSignBody("/jdJoinCardtf/mission/completeMission", Object.assign({
        missionType: $.missionType
      }, $.dplhVenderId ? {
        shopId: $.dplhVenderId
      } : {}, $.goodsNumId ? {
        goodsNumId: $.goodsNumId
      } : {}));
      break;
    case "getAwardSettingList":
      _0x49ac39 += "/dm/front/jdJoinCardtf/awards/getAwardSettingList";
      _0x363bf4 = {
        open_id: "",
        mix_nick: $.MixNick || "",
        user_id: $.userId
      };
      _0x511253 = getSignBody("/jdJoinCardtf/awards/getAwardSettingList", {
        dataType: $.dataType
      });
      break;
    case "exchangePost":
      _0x49ac39 += "/dm/front/jdJoinCardtf/interactive/exchangePost";
      _0x363bf4 = {
        open_id: "",
        mix_nick: $.MixNick || "",
        user_id: $.userId
      };
      _0x511253 = getSignBody("/jdJoinCardtf/interactive/exchangePost", {
        dataType: $.dataType,
        awardId: $.awardId
      });
      break;
    case "\u62BD\u5956":
      _0x49ac39 += "/dm/front/jdJoinCardtf/interactive/drawPost";
      _0x363bf4 = {
        open_id: "",
        mix_nick: $.MixNick || "",
        user_id: $.userId
      };
      _0x511253 = getSignBody("/jdJoinCardtf/interactive/drawPost", {
        dataType: "draw",
        usedGameNum: "2"
      });
      break;
    case "updateAddress":
      _0x49ac39 += "/dm/front/jdJoinCardtf/awards/updateAddress";
      _0x363bf4 = {
        open_id: "",
        mix_nick: $.MixNick || "",
        user_id: $.userId
      };
      _0x511253 = getSignBody("/jdJoinCardtf/awards/updateAddress", {
        receiverName: $.receiver,
        receiverMobile: $.phone,
        receiverProvince: $.province,
        receiverCity: $.city,
        receiverDistrict: $.county,
        receiverAddress: $.address,
        logId: $.generateId
      });
      break;
    case "inviteList":
      _0x49ac39 += "/dm/front/jdJoinCardtf/customer/inviteList";
      _0x363bf4 = {
        open_id: "",
        mix_nick: $.MixNick || "",
        bizExtString: "",
        user_id: $.userId
      };
      _0x511253 = getSignBody("/jdJoinCardtf/customer/inviteList", {});
      break;
    case "list":
      _0x49ac39 += "/dm/front/jdJoinCardtf/awards/list";
      _0x363bf4 = {
        open_id: "",
        mix_nick: $.MixNick || "",
        bizExtString: "",
        user_id: $.userId
      };
      _0x511253 = getSignBody("/jdJoinCardtf/awards/list", {
        pageNo: 1,
        pageSize: 9999
      });
      break;
    default:
      console.log("\u274C \u672A\u77E5\u8BF7\u6C42 " + _0x573c4f);
      return;
  }
  const _0x49e3fb = {};
  _0x511253 && Object.assign(_0x511253, _0x49e3fb);
  _0x363bf4 && Object.assign(_0x363bf4, _0x49e3fb);
  const _0x10d2fd = {
    url: _0x49ac39,
    method: _0x4a22a9,
    headers: {
      Accept: "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      Connection: "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: cookie,
      "User-Agent": $.UA,
      "X-Requested-With": "XMLHttpRequest"
    },
    params: _0x363bf4,
    data: _0x511253,
    timeout: 30000
  };
  _0x4a22a9 === "GET" && (delete _0x10d2fd.data, delete _0x10d2fd.headers["Content-Type"]);
  $.baseUrl.includes("jinggengjcq-isv.isvjcloud.com") && (Object.assign(_0x10d2fd.headers, {
    Origin: "https://jinggengjcq-isv.isvjcloud.com",
    "Content-Type": "application/json; charset=utf-8"
  }), delete _0x10d2fd.headers.Cookie);
  const _0x5a7dc5 = 5;
  let _0x362807 = 0,
    _0x1ac483 = null,
    _0xff1bea = false;
  while (_0x362807 < _0x5a7dc5) {
    _0x362807 > 0 && (await $.wait(1000));
    const _0x9aa33c = await common.request(_0x10d2fd);
    if (!_0x9aa33c.success) {
      _0x1ac483 = "\uD83D\uDEAB " + _0x573c4f + " \u8BF7\u6C42\u5931\u8D25 \u279C " + _0x9aa33c.error;
      _0x362807++;
      continue;
    }
    if (!_0x9aa33c.data) {
      _0x1ac483 = "\uD83D\uDEAB " + _0x573c4f + " \u8BF7\u6C42\u5931\u8D25 \u279C \u65E0\u54CD\u5E94\u6570\u636E";
      _0x362807++;
      continue;
    }
    await handleResponse(_0x573c4f, _0x9aa33c.data);
    _0xff1bea = false;
    break;
  }
  _0x362807 >= _0x5a7dc5 && (console.log(_0x1ac483), _0xff1bea && !hotbreak && ($.outFlag = true, $.message && $.message.fix(_0x1ac483)));
}
function getSignBody(_0x1147bc, _0x3210a7) {
  const _0x4bde89 = mpdzSign({
      actId: $.activityId,
      ..._0x3210a7,
      method: _0x1147bc,
      userId: $.userId,
      buyerNick: $.MixNick || ""
    }),
    _0x28484a = {
      jsonRpc: "2.0",
      params: {
        commonParameter: {
          m: "POST",
          oba: _0x4bde89.sign,
          timestamp: _0x4bde89.timeStamp,
          userId: $.userId
        },
        admJson: {
          actId: $.activityId,
          ..._0x3210a7,
          method: _0x1147bc,
          userId: $.userId,
          buyerNick: $.MixNick || ""
        }
      }
    };
  _0x1147bc.indexOf("missionInviteList") > -1 && delete _0x28484a.params.admJson.actId;
  return _0x28484a;
}
function mpdzSign(_0x7d4808) {
  const _0x235ec3 = "6cc5dbd8900e434b94c4bdb0c16348ed",
    _0x2d2a99 = "c1614da9ac68",
    _0x2ae39f = new Date().valueOf(),
    _0x4c37e5 = new RegExp("'", "g"),
    _0x1f6dae = new RegExp("~", "g"),
    _0xaa7e57 = encodeURIComponent(JSON.stringify(_0x7d4808)).replace(_0x4c37e5, "%27").replace(_0x1f6dae, "%7E"),
    _0x4e474c = "f" + _0x2d2a99 + "D" + _0xaa7e57 + "c" + _0x2ae39f + _0x235ec3,
    _0x255cbe = CryptoJS.MD5(_0x4e474c.toLowerCase()).toString();
  return {
    sign: _0x255cbe,
    timeStamp: _0x2ae39f
  };
}
async function getAuthorCodeList(_0x58d89e) {
  const _0x469541 = await common.request({
      url: _0x58d89e,
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      },
      proxy: null,
      debug: false,
      timeout: 30000
    }),
    _0xbcdc72 = _0x469541.data;
  return _0xbcdc72;
}
function random(_0x400fad, _0x52a16d) {
  return Math.floor(Math.random() * (_0x52a16d - _0x400fad)) + _0x400fad;
}
function getBlacklist() {
  if ($.blacklist == "") {
    return;
  }
  console.log("\u5F53\u524D\u5DF2\u8BBE\u7F6E\u9ED1\u540D\u5355\uFF1A");
  const _0x3752b2 = Array.from(new Set($.blacklist.split("&")));
  console.log(_0x3752b2.join("&") + "\n");
  let _0x291406 = _0x3752b2,
    _0x51e2b0 = [],
    _0x20268c = false;
  for (let _0x24b710 = 0; _0x24b710 < cookiesArr.length; _0x24b710++) {
    let _0x2d7aff = decodeURIComponent(cookiesArr[_0x24b710].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[_0x24b710].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!_0x2d7aff) {
      break;
    }
    let _0x492497 = false;
    for (let _0xde3377 of _0x291406) {
      if (_0xde3377 && _0xde3377 == _0x2d7aff) {
        _0x492497 = true;
        break;
      }
    }
    !_0x492497 && (_0x20268c = true, _0x51e2b0.splice(_0x24b710, -1, cookiesArr[_0x24b710]));
  }
  if (_0x20268c) {
    cookiesArr = _0x51e2b0;
  }
}
function Env(t, e) {
  "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
  class s {
    constructor(t) {
      this.env = t;
    }
    send(t, e = "GET") {
      t = "string" == typeof t ? {
        url: t
      } : t;
      let s = this.get;
      "POST" === e && (s = this.post);
      return new Promise((e, i) => {
        s.call(this, t, (t, s, r) => {
          t ? i(t) : e(s);
        });
      });
    }
    get(t) {
      return this.send.call(this.env, t);
    }
    post(t) {
      return this.send.call(this.env, t, "POST");
    }
  }
  return new class {
    constructor(t, e) {
      this.name = t;
      this.http = new s(this);
      this.data = null;
      this.dataFile = "box.dat";
      this.logs = [];
      this.isMute = !1;
      this.isNeedRewrite = !1;
      this.logSeparator = "\n";
      this.startTime = new Date().getTime();
      Object.assign(this, e);
      this.log("", `🔔${this.name}, 开始!`);
    }
    isNode() {
      return "undefined" != typeof module && !!module.exports;
    }
    isQuanX() {
      return "undefined" != typeof $task;
    }
    isSurge() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
    }
    isLoon() {
      return "undefined" != typeof $loon;
    }
    toObj(t, e = null) {
      try {
        return JSON.parse(t);
      } catch {
        return e;
      }
    }
    toStr(t, e = null) {
      try {
        return JSON.stringify(t);
      } catch {
        return e;
      }
    }
    getjson(t, e) {
      let s = e;
      const i = this.getdata(t);
      if (i) {
        try {
          s = JSON.parse(this.getdata(t));
        } catch {}
      }
      return s;
    }
    setjson(t, e) {
      try {
        return this.setdata(JSON.stringify(t), e);
      } catch {
        return !1;
      }
    }
    getScript(t) {
      return new Promise(e => {
        this.get({
          url: t
        }, (t, s, i) => e(i));
      });
    }
    runScript(t, e) {
      return new Promise(s => {
        let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        i = i ? i.replace(/\n/g, "").trim() : i;
        let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        r = r ? 1 * r : 20;
        r = e && e.timeout ? e.timeout : r;
        const [o, h] = i.split("@"),
          n = {
            url: `http://${h}/v1/scripting/evaluate`,
            body: {
              script_text: t,
              mock_type: "cron",
              timeout: r
            },
            headers: {
              "X-Key": o,
              Accept: "*/*"
            }
          };
        this.post(n, (t, e, i) => s(i));
      }).catch(t => this.logErr(t));
    }
    loaddata() {
      if (!this.isNode()) {
        return {};
      }
      {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e);
        if (!s && !i) {
          return {};
        }
        {
          const i = s ? t : e;
          try {
            return JSON.parse(this.fs.readFileSync(i));
          } catch (t) {
            return {};
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs");
        this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e),
          r = JSON.stringify(this.data);
        s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r);
      }
    }
    lodash_get(t, e, s) {
      const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
      let r = t;
      for (const t of i) if (r = Object(r)[t], void 0 === r) {
        return s;
      }
      return r;
    }
    lodash_set(t, e, s) {
      return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t);
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
          r = s ? this.getval(s) : "";
        if (r) {
          try {
            const t = JSON.parse(r);
            e = t ? this.lodash_get(t, i, "") : e;
          } catch (t) {
            e = "";
          }
        }
      }
      return e;
    }
    setdata(t, e) {
      let s = !1;
      if (/^@/.test(e)) {
        const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
          o = this.getval(i),
          h = i ? "null" === o ? null : o || "{}" : "{}";
        try {
          const e = JSON.parse(h);
          this.lodash_set(e, r, t);
          s = this.setval(JSON.stringify(e), i);
        } catch (e) {
          const o = {};
          this.lodash_set(o, r, t);
          s = this.setval(JSON.stringify(o), i);
        }
      } else {
        s = this.setval(t, e);
      }
      return s;
    }
    getval(t) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null;
    }
    setval(t, e) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null;
    }
    initGotEnv(t) {
      this.got = this.got ? this.got : require("got");
      this.cktough = this.cktough ? this.cktough : require("tough-cookie");
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
      t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar));
    }
    get(t, e = () => {}) {
      t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]);
      this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.get(t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status);
        e(t, s, i);
      })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
        hints: !1
      })), $task.fetch(t).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o);
      }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
        try {
          if (t.headers["set-cookie"]) {
            const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
            s && this.ckjar.setCookieSync(s, null);
            e.cookieJar = this.ckjar;
          }
        } catch (t) {
          this.logErr(t);
        }
      }).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o);
      }, t => {
        const {
          message: s,
          response: i
        } = t;
        e(s, i, i && i.body);
      }));
    }
    post(t, e = () => {}) {
      if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) {
        this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
          "X-Surge-Skip-Scripting": !1
        }));
        $httpClient.post(t, (t, s, i) => {
          !t && s && (s.body = i, s.statusCode = s.status);
          e(t, s, i);
        });
      } else {
        if (this.isQuanX()) {
          t.method = "POST";
          this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
            hints: !1
          }));
          $task.fetch(t).then(t => {
            const {
              statusCode: s,
              statusCode: i,
              headers: r,
              body: o
            } = t;
            e(null, {
              status: s,
              statusCode: i,
              headers: r,
              body: o
            }, o);
          }, t => e(t));
        } else {
          if (this.isNode()) {
            this.initGotEnv(t);
            const {
              url: s,
              ...i
            } = t;
            this.got.post(s, i).then(t => {
              const {
                statusCode: s,
                statusCode: i,
                headers: r,
                body: o
              } = t;
              e(null, {
                status: s,
                statusCode: i,
                headers: r,
                body: o
              }, o);
            }, t => {
              const {
                message: s,
                response: i
              } = t;
              e(s, i, i && i.body);
            });
          }
        }
      }
    }
    time(t, e = null) {
      const s = e ? new Date(e) : new Date();
      let i = {
        "M+": s.getMonth() + 1,
        "d+": s.getDate(),
        "H+": s.getHours(),
        "m+": s.getMinutes(),
        "s+": s.getSeconds(),
        "q+": Math.floor((s.getMonth() + 3) / 3),
        S: s.getMilliseconds()
      };
      /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
      return t;
    }
    msg(e = t, s = "", i = "", r) {
      const o = t => {
        if (!t) {
          return t;
        }
        if ("string" == typeof t) {
          return this.isLoon() ? t : this.isQuanX() ? {
            "open-url": t
          } : this.isSurge() ? {
            url: t
          } : void 0;
        }
        if ("object" == typeof t) {
          if (this.isLoon()) {
            let e = t.openUrl || t.url || t["open-url"],
              s = t.mediaUrl || t["media-url"];
            return {
              openUrl: e,
              mediaUrl: s
            };
          }
          if (this.isQuanX()) {
            let e = t["open-url"] || t.url || t.openUrl,
              s = t["media-url"] || t.mediaUrl;
            return {
              "open-url": e,
              "media-url": s
            };
          }
          if (this.isSurge()) {
            let e = t.url || t.openUrl || t["open-url"];
            return {
              url: e
            };
          }
        }
      };
      if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
        let t = ["", "==============\uD83D\uDCE3\u7CFB\u7EDF\u901A\u77E5\uD83D\uDCE3=============="];
        t.push(e);
        s && t.push(s);
        i && t.push(i);
        console.log(t.join("\n"));
        this.logs = this.logs.concat(t);
      }
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]);
      console.log(t.join(this.logSeparator));
    }
    logErr(t, e) {
      const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t);
    }
    wait(t) {
      return new Promise(e => setTimeout(e, t));
    }
    done(t = {}) {
      const e = new Date().getTime(),
        s = (e - this.startTime) / 1000;
      this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`);
      this.log();
      (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t);
    }
  }(t, e);
}