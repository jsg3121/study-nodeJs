const http = require('http'); // 서버를 만드는 모듈 불러옴
http.createServer((request, response) => { // 서버 만드는 메소드
}).listen(8088);

console.log('server start!');

var CryptoJS = require("crypto-js");

var SHA256 = CryptoJS.SHA256;
var MD5 = CryptoJS.MD5;

var shopCd = "poetdeaths";
var cusNm = "정용재";
var cusHp = "010-639-6384";
var posNo = "1";
var saleGb = "1";
var itemsCnt = 2;
var timestamp = "20201103141250";
var items = [
  {
    itemCd: "7H26141",
    itemNm: "VISCO PILE FLEECE_W",
    sort: 1,
    qty: 1,
    sizeCode: "100",
    colorCode: "800",
    colorName: "BLUE",
  },
  {
    itemCd: "7H70962",
    itemNm: "아노락 패딩 자켓",
    sort: 2,
    qty: 3,
    sizeCode: "105",
    colorCode: "800",
    colorName: "BLUE",
  },
];


var crypto1 = SHA256(
  shopCd + cusNm + cusHp + posNo + saleGb + itemsCnt + timestamp
).toString();

var hashKey = MD5(crypto1).toString();

var output = {
  shopCd,
  cusNm,
  cusHp,
  posNo,
  saleGb,
  itemsCnt,
  timestamp,
  hashKey,
  items,
};

pm.environment.set("request_body", JSON.stringify(output));
