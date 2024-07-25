//Thu Jul 25 2024 06:55:25 GMT+0000 (Coordinated Universal Time)
//Base:https://github.com/echo094/decode-js
//Modify:https://github.com/smallfawn/decode_action
const $ = new Env("大牌联合0725");
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
  jdMarket: "[京豆]",
  coin: "[金币]",
  point: "[积分]",
  integral: "[积分]",
  goods: "[实物]",
  product: "[广告]",
  coupon: "[优惠券]",
  chance: "[次数]",
  card: "[卡片]"
};
let cookie = "",
  originCookie = "",
  cookiesArr = Object.keys(jdCookie).map(_0x26a09d => jdCookie[_0x26a09d]).filter(_0x420e3d => _0x420e3d);
!cookiesArr[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
$.blacklist = process.env.jd_dplh_blacklist || "";
getBlacklist();
$.errMsgPin = [];
$.errOpencard = [];
!(async () => {
  console.log("==========" + $.name + "变量开启状态==========");
  console.log("开卡类活动不会自动运行，请自行测试是否有水");
  console.log("代理开关: [" + common.getProxyStatus() + "]");
  console.log("间隔时长: [" + (waitTimes === 0 ? "无" : waitTimes / 1000 + "秒") + "]运行间隔时长");
  console.log("浏览任务: [" + (dplh_viewShop ? "开启" : "关闭") + "]");
  console.log("加购任务: [" + (dplh_AddCart ? "开启" : "关闭") + "]");
  console.log("IP限制后继续执行: [" + (hotbreak ? "开启" : "关闭") + "]");
  console.log("==========" + $.name + "变量状态结束==========");
  if (!activityUrl) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  authorCodeList = await getAuthorCodeList("http://code.257999.xyz/jd_dplh.json");
  authorCodeList ? (console.log("\n服务状态正常，活动获取成功"), $.authorCode = authorCodeList[random(0, authorCodeList.length)]) : ($.authorCode = "", console.log("\n服务状态异常，请检查网络是否正常\n"));
  $.activityUrl = activityUrl;
  $.activityUrl && ($.activityUrl.includes("actId=") ? $.activityId = common.getUrlParameter(activityUrl, "actId") : $.activityId = $.activityUrl);
  $.hostname = "jinggengjcq-isv.isvjcloud.com";
  $.baseUrl = "https://" + $.hostname;
  if (!$.activityId) {
    console.log("⚠ 请填写格式正确的变量");
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
      console.log("❌ 随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！\n");
      return false;
    }
    const [_0x178f72, _0x2fbb79, _0x3274a0, _0x31d483, _0x10ef16, _0x3644db] = _0xd7694d[$.randNum].split("@");
    for (let _0x12bf0c = 0; _0x12bf0c < 6; _0x12bf0c++) {
      if (_0xd7694d[_0x12bf0c] === "") {
        console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不能为空）\n");
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
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    await Main();
    common.unsetCookie();
    if ($.outFlag || $.runEnd) {
      break;
    }
  }
  if ($.errMsgPin.length > 0) {
    let _0x1001ba = "\n以下账号可能是火爆，请加入黑名单\nexport jd_dplh_blacklist=\"" + $.errMsgPin.join("&") + "\"";
    console.log(_0x1001ba);
  }
  if ($.errOpencard.length > 0) {
    let _0x2bc94a = "\n以下账号开卡火爆，请自行决定是否加入黑名单\n\"" + $.errOpencard.join("&") + "\"";
    console.log(_0x2bc94a);
  }
  isNotify && notify.getMessage() && (notify.appendContent("\n【活动ID】" + $.activityId), await notify.push());
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
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    $.activityload = "";
    await sendRequest("activity_load");
    if ($.MixNick == "") {
      console.log("获取[活动信息]失败，可能是黑号或者太卡了");
      return;
    }
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    if (!$.hasGetBasicInfo) {
      $.hasGetBasicInfo = true;
      const _0x395f0b = $.time("yyyy-MM-dd HH:mm", $.startTime),
        _0x13a78c = $.time("yyyy-MM-dd HH:mm", $.endTime);
      console.log("活动名称：#联合开卡[" + $.activityId + "]\n开始时间：" + _0x395f0b + "\n结束时间：" + _0x13a78c);
      notify.appendContent("活动名称：#联合开卡[" + $.activityId + "]\n开始时间：" + _0x395f0b + "\n结束时间：" + _0x13a78c);
      const _0x2585f8 = Date.now();
      if ($.startTime && _0x2585f8 < $.startTime) {
        console.log("活动将在 " + _0x395f0b + " 开始，晚点再来吧~");
        $.message.fix("活动尚未开始，开始时间：" + _0x395f0b);
        $.runEnd = true;
        return;
      }
      if ($.endTime && _0x2585f8 > $.endTime) {
        console.log("活动已于 " + _0x13a78c + " 结束，下次早点来吧~");
        $.message.fix("活动已结束，结束时间：" + _0x13a78c);
        $.runEnd = true;
        return;
      }
    }
    console.log("账号活动信息：\n助力码：[" + $.MixNick + "]\n");
    $.inviteNick && (await sendRequest("绑定"), await $.wait(parseInt(waitTimes * 1 + 100, 10)));
    if ($.runEnd || $.outFlag) {
      return;
    }
    $.shopList = "";
    await sendRequest("shopList");
    await $.wait(parseInt(waitTimes * 1 + 100, 10));
    if ($.shopList) {
      let _0x107d51 = ($.shopList || []).filter(_0x98a89a => _0x98a89a.open == false);
      console.log("共有" + $.shopList.length + "张卡,还需开" + _0x107d51.length + "张卡");
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
            console.log("加入[" + $.shopTitle + "]店铺会员成功");
            await $.wait(parseInt(waitTimes * 1 + 100, 10));
          } else {
            console.log("[" + $.shopTitle + "]店铺开卡失败,跳过执行~");
            break;
          }
          await sendRequest("activity_load");
          await $.wait(parseInt(waitTimes * 1 + 100, 10));
          $.dplhVenderId = "";
        }
      }
    }
    $.hasCollectShop == 0 && ($.missionType = "uniteCollectShop", await sendRequest("mission"), await $.wait(parseInt(waitTimes * 1 + 1000, 10)));
    dplh_AddCart ? $.hasAddCart == 0 && ($.missionType = "uniteAddCart", await sendRequest("mission"), await $.wait(parseInt(waitTimes * 1 + 1000, 10))) : console.log("未设置加购任务变量，不执行加购任务\n");
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
      console.log("未设置浏览任务变量，不执行浏览任务\n");
    }
    await sendRequest("list");
    await $.wait(parseInt(waitTimes * 1 + 100, 10));
    if (dplh_draw != 0) {
      if ($.open_draw) {
        let _0x4fc742 = parseInt($.remainPoint / 200);
        if (_0x4fc742 > dplh_draw) {
          _0x4fc742 = dplh_draw;
        }
        console.log("设定抽奖次数为:" + _0x4fc742 + "，当前积分：" + $.remainPoint);
        for (m = 1; _0x4fc742--; m++) {
          console.log("第" + m + "次抽奖");
          await $.wait(parseInt(waitTimes * 1 + 3000, 10));
          await sendRequest("抽奖");
          if (Number(_0x4fc742) <= 0) {
            break;
          }
          if (m >= 10) {
            console.log("抽奖太多次，多余的次数请再执行脚本");
            break;
          }
          await $.wait(parseInt(waitTimes * 1 + 3000, 10));
        }
      }
    }
    console.log("当前助力:[" + ($.inviteNick || "未获取到数据") + "]");
    $.index == 1 && ($.inviteNick = $.MixNick, console.log("后面都助力:[" + $.inviteNick + "]"));
    await $.wait(parseInt(waitTimes * 1 + 100, 10));
  } catch (_0x42bfa5) {
    console.log("❌ 脚本运行遇到了错误\n" + _0x42bfa5);
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
          _0xcf9f08.data?.["status"] == 500 ? (console.log("" + _0xcf9f08.errorMessage), $.errMsgPin.push($.UserName), $.message.fix("" + _0xcf9f08.errorMessage), $.skipRun = true) : console.log("❓" + _0x4ba7a4 + " " + JSON.stringify(_0xcf9f08));
        }
        break;
      case "绑定":
        if (_0xcf9f08.success && _0xcf9f08.data?.["status"] == 200) {
          console.log("" + _0xcf9f08.data?.["msg"]);
        } else {
          _0xcf9f08.data?.["status"] == 500 ? (console.log("" + _0xcf9f08.errorMessage), ["结束", "开始"].some(_0x32a798 => _0xcf9f08.errorMessage.includes(_0x32a798)) && ($.runEnd = true)) : console.log("❓" + _0x4ba7a4 + " " + JSON.stringify(_0xcf9f08));
        }
        break;
      case "shopList":
        if (_0xcf9f08.success && _0xcf9f08.data?.["status"] == 200) {
          $.shopList = _0xcf9f08?.["data"]?.["data"] || [];
        } else {
          _0xcf9f08.data?.["status"] == 500 ? console.log("" + _0xcf9f08.errorMessage) : console.log("❓" + _0x4ba7a4 + " " + JSON.stringify(_0xcf9f08));
        }
        break;
      case "mission":
        if (_0xcf9f08.success && _0xcf9f08.data?.["status"] == 200) {
          $.mission = _0xcf9f08?.["data"]?.["data"];
          console.log("" + (_0xcf9f08.msg || $.mission?.["remark"] || ""));
          $.message.fix("" + (_0xcf9f08.msg || $.mission?.["remark"] || ""));
        } else {
          _0xcf9f08.data?.["status"] == 500 ? console.log("" + _0xcf9f08.errorMessage) : console.log("❓" + _0x4ba7a4 + " " + JSON.stringify(_0xcf9f08));
        }
        break;
      case "getAwardSettingList":
        if (_0xcf9f08.success && _0xcf9f08.data?.["status"] == 200) {
          $.getAwardSettingList = _0xcf9f08?.["data"]?.["data"]?.["awardSettings"];
        } else {
          _0xcf9f08.data?.["status"] == 500 ? console.log("" + _0xcf9f08.errorMessage) : console.log("❓" + _0x4ba7a4 + " " + JSON.stringify(_0xcf9f08));
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
              console.log("🎉 " + _0x3ede99?.["awardName"] + " 🐶");
              $.message.fix("🎉 " + _0x3ede99?.["awardName"] + " 🐶");
              break;
            case "point":
            case "integral":
              console.log("🗑️ " + _0x3ede99?.["awardName"] + "  🎟️");
              $.message.fix("🗑️ " + _0x3ede99?.["awardName"] + "  🎟️");
              break;
            case "goods":
              $.generateId = _0x3ede99?.["id"];
              $.prizeShiWu = _0x3ede99?.["awardName"];
              console.log("🎉 恭喜获得实物~");
              console.log("奖品名称：" + $.prizeShiWu);
              if (_0x3ede99?.["awardPic"]) {
                console.log("预览图片：" + _0x3ede99?.["awardPic"]);
              }
              $.message.fix("🎉 恭喜获得实物，奖品名称：" + $.prizeShiWu);
              process.env.WX_ADDRESS && (await sendRequest("updateAddress"), await $.wait(4000));
              break;
            case "coin":
            case "product":
            case "coupon":
            case "chance":
            case "card":
              console.log("🗑️ " + prize_type[prizeType]);
              break;
            default:
              console.log(_0x33bbd4 + " 暂时未收录，请联系作者添加\n");
              console.log("" + JSON.stringify($.exchangePost));
          }
        } else {
          _0xcf9f08.data?.["status"] == 500 ? console.log("" + _0xcf9f08.errorMessage) : console.log("❓" + _0x4ba7a4 + " " + JSON.stringify(_0xcf9f08));
        }
        break;
      case "inviteList":
        if (_0xcf9f08.success && _0xcf9f08.data?.["status"] == 200) {
          $.inviteList = _0xcf9f08?.["data"]?.["data"];
        } else {
          _0xcf9f08.data?.["status"] == 500 ? console.log("" + _0xcf9f08.errorMessage) : console.log("❓" + _0x4ba7a4 + " " + JSON.stringify(_0xcf9f08));
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
            console.log("查询奖励成功，累计获得" + _0x38d96c + "京豆\n");
          }
        } else {
          _0xcf9f08.data?.["status"] == 500 ? console.log("" + _0xcf9f08.errorMessage) : console.log("❓" + _0x4ba7a4 + " " + JSON.stringify(_0xcf9f08));
        }
        break;
      case "updateAddress":
        if (_0xcf9f08.success && _0xcf9f08.data?.["status"] == 200) {
          _0xcf9f08?.["data"]?.["data"]?.["result"] ? (console.log("已提交收货地址 ✅\n登记为随机抽取到的第" + ($.randNum + 1) + "套收货地址信息\n联系信息：" + $.receiver + " (" + $.phone.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "）\n"), !isNotify && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + $.prizeShiWu + "，已成功自动登记收货地址\n\n活动ID：" + $.activityId)), $.message.insert($.prizeShiWu + "(已填地址)🎁")) : console.log(_0xcf9f08.data.data);
        } else {
          _0xcf9f08.data?.["status"] == 500 ? console.log("" + _0xcf9f08.errorMessage) : console.log("❓" + _0x4ba7a4 + " " + JSON.stringify(_0xcf9f08));
        }
        break;
      case "抽奖":
        console.log("❓" + _0x4ba7a4 + " " + JSON.stringify(_0xcf9f08));
        if (_0xcf9f08.success && _0xcf9f08.data?.["status"] == 200) {
          $.dplhdraw = _0xcf9f08?.["data"]?.["data"];
          let _0x16ad40 = $.dplhdraw?.["awardSendLog"],
            _0x325127 = _0x16ad40?.["awardType"];
          switch (_0x325127) {
            case "jdMarket":
              console.log("🎉 " + _0x16ad40?.["awardName"] + " 🐶");
              $.message.fix("🎉 " + _0x16ad40?.["awardName"] + " 🐶");
              break;
            case "point":
            case "integral":
              console.log("🗑️ " + _0x16ad40?.["awardName"] + "  🎟️");
              $.message.fix("🗑️ " + _0x16ad40?.["awardName"] + "  🎟️");
              break;
            case "goods":
              $.generateId = _0x16ad40?.["id"];
              $.prizeShiWu = _0x16ad40?.["awardName"];
              console.log("🎉 恭喜获得实物~");
              console.log("奖品名称：" + $.prizeShiWu);
              if (_0x16ad40?.["awardPic"]) {
                console.log("预览图片：" + _0x16ad40?.["awardPic"]);
              }
              $.message.fix("🎉 恭喜获得实物，奖品名称：" + $.prizeShiWu);
              process.env.WX_ADDRESS && (await sendRequest("updateAddress"), await $.wait(4000));
              break;
            case "coin":
            case "product":
            case "coupon":
            case "chance":
            case "card":
              console.log("🗑️ " + prize_type[_0x325127]);
              break;
            default:
              console.log(_0x325127 + " 暂时未收录，请联系作者添加\n");
              console.log("" + JSON.stringify($.exchangePost));
          }
        } else {
          _0xcf9f08.data?.["status"] == 500 ? console.log("" + _0xcf9f08.errorMessage) : console.log("❓" + _0x4ba7a4 + " " + JSON.stringify(_0xcf9f08));
        }
        break;
    }
  } catch (_0x4eb389) {
    console.log("❌ 未能正确处理 " + _0x4ba7a4 + " 请求响应 " + (_0x4eb389.message || _0x4eb389));
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
    case "绑定":
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
    case "抽奖":
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
      console.log("❌ 未知请求 " + _0x573c4f);
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
      _0x1ac483 = "🚫 " + _0x573c4f + " 请求失败 ➜ " + _0x9aa33c.error;
      _0x362807++;
      continue;
    }
    if (!_0x9aa33c.data) {
      _0x1ac483 = "🚫 " + _0x573c4f + " 请求失败 ➜ 无响应数据";
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
  console.log("当前已设置黑名单：");
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
        let t = ["", "==============📣系统通知📣=============="];
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
